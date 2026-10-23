import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReviewForm from "@/components/ReviewForm";
import { supabase } from "@/integrations/supabase/client";

const DISMISS_KEY = "id-review-prompt-dismissed";

/** Shown after a learner earns a certificate, unless they already reviewed or chose "Maybe later". */
const RateExperienceDialog = ({ trigger }: { trigger: boolean }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!trigger || localStorage.getItem(DISMISS_KEY)) return;
    let timer: ReturnType<typeof setTimeout>;
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: existing } = await supabase
        .from("reviews").select("id").eq("user_id", data.user.id).maybeSingle();
      if (!existing) timer = setTimeout(() => setOpen(true), 2500);
    });
    return () => clearTimeout(timer);
  }, [trigger]);

  const later = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : later())}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-center">Rate your experience</DialogTitle>
          <DialogDescription className="text-center">
            Congratulations on your certificate! How was learning with Indian Dreams?
          </DialogDescription>
        </DialogHeader>
        <ReviewForm bare onSubmitted={() => setOpen(false)} />
        <Button variant="ghost" size="sm" onClick={later}>Maybe later</Button>
      </DialogContent>
    </Dialog>
  );
};

export default RateExperienceDialog;
