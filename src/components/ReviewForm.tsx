import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  onSubmitted?: () => void;
}

const ReviewForm = ({ onSubmitted }: Props) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      if (!user) return;
      setUserId(user.id);
      setName((user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "");
      supabase
        .from("reviews")
        .select("name, role, rating, text")
        .eq("user_id", user.id)
        .maybeSingle()
        .then(({ data: existing }) => {
          if (existing) {
            setName(existing.name);
            setRole(existing.role ?? "");
            setRating(existing.rating);
            setText(existing.text);
          }
        });
    });
  }, []);

  if (!userId) return null;

  const submit = async () => {
    if (!name.trim() || !text.trim()) {
      toast.error("Please add your name and a short review.");
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("reviews")
      .upsert(
        { user_id: userId, name: name.trim(), role: role.trim() || null, rating, text: text.trim() },
        { onConflict: "user_id" }
      );
    setSaving(false);
    if (error) {
      toast.error("Could not save your review. Please try again.");
      return;
    }
    toast.success("Thanks for your review!");
    onSubmitted?.();
  };

  return (
    <div className="max-w-xl mx-auto mt-14 bg-card rounded-2xl p-7 card-elevated">
      <h3 className="font-display text-xl font-bold mb-1">Share your experience</h3>
      <p className="text-sm text-muted-foreground mb-5">Your review appears publicly on this page.</p>
      <div className="flex gap-1 mb-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} type="button" onClick={() => setRating(i)} aria-label={`${i} star`}>
            <Star size={24} className={i <= rating ? "fill-accent text-accent" : "text-muted"} />
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Your role (optional)" />
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What did you learn?"
        rows={4}
        className="mb-4"
      />
      <Button onClick={submit} disabled={saving} className="w-full">
        {saving ? "Saving..." : "Submit review"}
      </Button>
    </div>
  );
};

export default ReviewForm;