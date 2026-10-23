import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Send, X, RotateCcw, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = ["Which course should I start with?", "How do I get a certificate?", "Give me a ChatGPT prompt tip"];
const FUNCTIONS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

/** Floating help assistant for signed-in learners. One conversation, kept only for this visit. */
const SiteAssistant = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSignedIn(!!s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [messages, busy]);
  useEffect(() => { if (open && !busy) inputRef.current?.focus(); }, [open, busy]);

  if (!signedIn) return null;

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;
    const history = [...messages, { role: "user" as const, content: text }].slice(-19);
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError("");
    setBusy(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${FUNCTIONS_URL}/site-assistant`, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${session?.access_token ?? ""}`,
        },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "The assistant is unavailable right now.");
      }
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let answer = "";
      const handle = (block: string) => {
        const data = block.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.slice(5).trim()).join("\n");
        if (!data || data === "[DONE]") return;
        try {
          const p = JSON.parse(data);
          if (p.type === "response.output_text.delta" && typeof p.delta === "string") {
            answer += p.delta;
            setMessages([...history, { role: "assistant", content: answer }]);
          }
        } catch { /* ignore partial */ }
      };
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const blocks = buffer.split(/\r?\n\r?\n/);
        buffer = blocks.pop() || "";
        blocks.forEach(handle);
      }
      if (buffer.trim()) handle(buffer);
      if (!answer) throw new Error("The assistant didn't reply. Please try again.");
    } catch (e) {
      if ((e as Error).name === "AbortError") {
        setMessages((m) => (m[m.length - 1]?.content ? m : m.slice(0, -1)));
      } else {
        setMessages(history);
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(560px,calc(100vh-8rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card card-elevated print:hidden"
          >
            <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <GraduationCap size={18} />
              </div>
              <div className="flex-1">
                <p className="font-display font-bold leading-tight">Dreamy</p>
                <p className="text-xs opacity-80">Your Indian Dreams learning assistant</p>
              </div>
              {messages.length > 0 && (
                <button aria-label="New conversation" onClick={() => { abortRef.current?.abort(); setMessages([]); setError(""); }} className="opacity-80 hover:opacity-100">
                  <RotateCcw size={16} />
                </button>
              )}
              <button aria-label="Close assistant" onClick={() => setOpen(false)} className="opacity-80 hover:opacity-100">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Hi! Ask me about courses, certificates, your plan, or any AI tool.</p>
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => send(s)} className="block w-full rounded-lg border border-border px-3 py-2 text-left text-sm hover:bg-muted">
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground">{m.content}</div>
                ) : m.content ? (
                  <div key={i} className="prose prose-sm max-w-none text-foreground"><ReactMarkdown>{m.content}</ReactMarkdown></div>
                ) : (
                  <div key={i} className="flex gap-1 py-2" aria-label="Assistant is typing">
                    {[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${d * 120}ms` }} />)}
                  </div>
                ),
              )}
              {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
              <div ref={endRef} />
            </div>

            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-end gap-2 border-t border-border p-3">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Ask Dreamy anything…"
                rows={1}
                maxLength={2000}
                className="min-h-[40px] resize-none"
              />
              {busy ? (
                <Button type="button" size="icon" variant="outline" aria-label="Stop" onClick={() => abortRef.current?.abort()}><Square size={16} /></Button>
              ) : (
                <Button type="submit" size="icon" aria-label="Send" disabled={!input.trim()}><Send size={16} /></Button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        aria-label={open ? "Close assistant" : "Open assistant"}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 print:hidden"
      >
        {open ? <X size={22} /> : <GraduationCap size={24} />}
      </button>
    </>
  );
};

export default SiteAssistant;
