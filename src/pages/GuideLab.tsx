import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Bot, Check, Copy, Download, Image as ImageIcon, Loader2, RefreshCw, Send, Sparkles, User } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { AIPlatformLogo } from "@/components/AIPlatformLogo";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { guideTools } from "@/data/guideTools";
import { supabase } from "@/integrations/supabase/client";

type Message = { role: "user" | "assistant"; content: string };

const functionsUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

const readResponseError = async (response: Response) => {
  const payload = await response.json().catch(() => ({}));
  return payload.error || payload.message || "Generation failed. Please try again.";
};

const GuideLab = () => {
  const { guideId = "" } = useParams<{ guideId: string }>();
  const guide = guideTools[guideId];
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [reasoning, setReasoning] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [style, setStyle] = useState("realistic");
  const [aspectRatio, setAspectRatio] = useState("square");
  const resultRef = useRef<HTMLDivElement>(null);

  const isImageGuide = guide?.mode === "image";
  const lastAnswer = useMemo(() => [...messages].reverse().find((message) => message.role === "assistant")?.content || "", [messages]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }
      setAccessToken(session.access_token);
      setUserName(session.user.user_metadata?.full_name || session.user.email || "Learner");
      setLoading(false);
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/login");
      else setAccessToken(session.access_token);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const authHeaders = () => ({
    "Content-Type": "application/json",
    apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${accessToken}`,
  });

  const generateText = async () => {
    const text = prompt.trim();
    if (!guide || !text || isGenerating) return;
    const userMessage: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMessage].slice(-11);
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setPrompt("");
    setReasoning("");
    setError("");
    setIsGenerating(true);

    try {
      const response = await fetch(`${functionsUrl}/guide-text`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ guideId: guide.id, messages: nextMessages }),
      });
      if (!response.ok) throw new Error(await readResponseError(response));
      if (!response.body) throw new Error("The AI returned an empty response.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let answer = "";
      let thought = "";

      const processEvent = (block: string) => {
        const eventName = block.split("\n").find((line) => line.startsWith("event:"))?.slice(6).trim();
        const data = block.split("\n").filter((line) => line.startsWith("data:" )).map((line) => line.slice(5).trim()).join("\n");
        if (!data || data === "[DONE]") return;
        try {
          const parsed = JSON.parse(data);
          const type = parsed.type || eventName;
          if (type === "response.output_text.delta" && typeof parsed.delta === "string") {
            answer += parsed.delta;
            setMessages([...nextMessages, { role: "assistant", content: answer }]);
          }
          if (type === "response.reasoning_summary_text.delta" && typeof parsed.delta === "string") {
            thought += parsed.delta;
            setReasoning(thought);
          }
        } catch {
          return;
        }
      };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const blocks = buffer.split(/\r?\n\r?\n/);
        buffer = blocks.pop() || "";
        blocks.forEach(processEvent);
      }
      if (buffer.trim()) processEvent(buffer);
      if (!answer) throw new Error(thought || "The AI completed without an answer. Please try a more specific prompt.");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch (generationError) {
      setMessages(nextMessages);
      setError(generationError instanceof Error ? generationError.message : "Generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async () => {
    const text = prompt.trim();
    if (!guide || !text || isGenerating) return;
    setError("");
    setImageUrl("");
    setIsGenerating(true);
    try {
      const response = await fetch(`${functionsUrl}/guide-image`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ guideId: guide.id, prompt: text, style, aspectRatio }),
      });
      if (!response.ok) throw new Error(await readResponseError(response));
      const result = await response.json();
      if (!result.imageUrl) throw new Error("The AI did not return an image.");
      setImageUrl(result.imageUrl);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : "Image generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyAnswer = async () => {
    if (!lastAnswer) return;
    await navigator.clipboard.writeText(lastAnswer);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const resetWorkspace = () => {
    setMessages([]);
    setReasoning("");
    setImageUrl("");
    setError("");
    setPrompt("");
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!guide) return <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4"><p className="text-muted-foreground">This AI guide is not available.</p><Button asChild variant="outline"><Link to="/guides">Back to Guides</Link></Button></div>;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar userName={userName} onLogout={handleLogout} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 min-h-14 flex items-center justify-between gap-3 border-b border-border bg-card/90 backdrop-blur-sm px-4 md:px-6 py-2">
            <div className="flex items-center gap-3 min-w-0">
              <SidebarTrigger className="md:hidden" />
              <Link to="/guides" aria-label="Back to guides" className="text-muted-foreground hover:text-foreground"><ArrowLeft size={18} /></Link>
              <AIPlatformLogo platform={guide.id} className="h-7 w-7 shrink-0" />
              <div className="min-w-0"><h1 className="text-sm md:text-base font-bold truncate">{guide.title} Workspace</h1><p className="text-xs text-muted-foreground hidden sm:block">Powered by Indian Dreams AI</p></div>
            </div>
            <Button variant="ghost" size="sm" onClick={resetWorkspace} disabled={isGenerating || (!messages.length && !imageUrl)}><RefreshCw size={15} /> Reset</Button>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto px-4 py-6 md:px-8 md:py-10">
              <section className="mb-7 border-b border-border pb-6">
                <div className="flex items-center gap-3 mb-3"><div className="h-11 w-11 rounded-md bg-muted flex items-center justify-center"><AIPlatformLogo platform={guide.id} className="h-7 w-7" /></div><span className="text-xs font-semibold uppercase text-primary">{isImageGuide ? "Image studio" : "AI workspace"}</span></div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Create with {guide.title}</h2>
                <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">{guide.tagline}</p>
              </section>

              <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 lg:gap-8 items-start">
                <section className="space-y-5">
                  <div>
                    <label htmlFor="guide-prompt" className="text-sm font-semibold text-foreground">What do you want to create?</label>
                    <Textarea id="guide-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder={guide.placeholder} className="mt-2 min-h-40 resize-y bg-card" maxLength={isImageGuide ? 2000 : 6000} disabled={isGenerating} />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>{isImageGuide ? "Describe visual details for a stronger result" : "Follow up after the first result to refine it"}</span><span>{prompt.length}/{isImageGuide ? 2000 : 6000}</span></div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Quick starts</p>
                    <div className="flex flex-wrap gap-2">{guide.presets.map((preset) => <Button key={preset} type="button" variant="outline" size="sm" className="h-auto whitespace-normal text-left" onClick={() => setPrompt(preset)} disabled={isGenerating}>{preset}</Button>)}</div>
                  </div>

                  {isImageGuide && <div className="grid sm:grid-cols-2 gap-3">
                    <div><label className="text-xs font-semibold text-muted-foreground">Style</label><Select value={style} onValueChange={setStyle} disabled={isGenerating}><SelectTrigger className="mt-2 bg-card"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="realistic">Photorealistic</SelectItem><SelectItem value="cinematic">Cinematic</SelectItem><SelectItem value="illustration">Illustration</SelectItem><SelectItem value="minimal">Minimal</SelectItem></SelectContent></Select></div>
                    <div><label className="text-xs font-semibold text-muted-foreground">Format</label><Select value={aspectRatio} onValueChange={setAspectRatio} disabled={isGenerating}><SelectTrigger className="mt-2 bg-card"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="square">Square · 1:1</SelectItem><SelectItem value="landscape">Landscape · 16:9</SelectItem><SelectItem value="portrait">Portrait · 4:5</SelectItem></SelectContent></Select></div>
                  </div>}

                  <Button variant="hero" size="lg" className="w-full" onClick={isImageGuide ? generateImage : generateText} disabled={!prompt.trim() || isGenerating}>
                    {isGenerating ? <><Loader2 className="animate-spin" /> {isImageGuide ? "Creating image…" : "Thinking…"}</> : <>{isImageGuide ? <ImageIcon /> : <Send />} Generate</>}
                  </Button>
                  <p className="text-xs text-muted-foreground leading-relaxed">This learning workspace is powered by Indian Dreams AI and simulates the selected tool’s typical workflow. It is not the official {guide.title} service.</p>
                </section>

                <section ref={resultRef} className="min-h-[420px] border border-border bg-card rounded-lg overflow-hidden">
                  <div className="h-12 border-b border-border px-4 flex items-center justify-between"><div className="flex items-center gap-2 text-sm font-semibold"><Sparkles size={16} className="text-accent" /> Result</div>{(lastAnswer || imageUrl) && <div className="flex gap-1">{lastAnswer && <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyAnswer} title="Copy result">{copied ? <Check /> : <Copy />}</Button>}{imageUrl && <Button asChild variant="ghost" size="icon" className="h-8 w-8" title="Download image"><a href={imageUrl} download={`${guide.id}-creation.png`}><Download /></a></Button>}</div>}</div>

                  {error ? <div className="m-5 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"><p className="font-semibold">Generation could not be completed</p><p className="mt-1">{error}</p></div> : null}

                  {!messages.length && !imageUrl && !isGenerating && !error && <div className="min-h-[365px] flex flex-col items-center justify-center text-center px-8"><div className="h-14 w-14 rounded-md bg-primary/10 flex items-center justify-center mb-4">{isImageGuide ? <ImageIcon className="text-primary" /> : <Bot className="text-primary" />}</div><p className="font-semibold text-foreground">Your result will appear here</p><p className="mt-1 text-sm text-muted-foreground max-w-xs">Choose a quick start or enter your own prompt to begin.</p></div>}

                  {isGenerating && !lastAnswer && !imageUrl && <div className="min-h-[365px] flex flex-col items-center justify-center text-center px-8"><Loader2 className="h-8 w-8 animate-spin text-primary mb-4" /><p className="font-semibold">{isImageGuide ? "Creating your image" : "Working through your request"}</p>{reasoning && <p className="mt-3 text-xs text-muted-foreground max-w-sm line-clamp-3">{reasoning}</p>}</div>}

                  {imageUrl && <div className="p-4"><img src={imageUrl} alt={`AI-generated result for ${prompt}`} className={`w-full object-contain rounded-md bg-muted ${aspectRatio === "landscape" ? "aspect-video" : aspectRatio === "portrait" ? "aspect-[4/5] max-h-[680px]" : "aspect-square max-h-[620px]"}`} /></div>}

                  {!isImageGuide && messages.length > 0 && <div className="p-4 md:p-5 space-y-5 max-h-[680px] overflow-y-auto">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>{message.role === "assistant" && <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0"><Bot size={15} className="text-primary" /></div>}<div className={`max-w-[88%] rounded-lg px-4 py-3 text-sm ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/60 border border-border"}`}>{message.role === "assistant" ? message.content ? <div className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"><ReactMarkdown>{message.content}</ReactMarkdown></div> : <Loader2 className="animate-spin text-muted-foreground" /> : <p className="whitespace-pre-wrap">{message.content}</p>}</div>{message.role === "user" && <div className="h-8 w-8 rounded-md bg-accent/20 flex items-center justify-center shrink-0"><User size={15} /></div>}</div>)}</div>}
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default GuideLab;