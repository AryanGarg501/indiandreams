import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const AccountSecurity = ({ currentEmail }: { currentEmail: string }) => {
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  const changeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || newEmail === currentEmail) return toast.error("Enter a different email address");
    setEmailLoading(true);
    const { error } = await supabase.auth.updateUser(
      { email: newEmail },
      { emailRedirectTo: `${window.location.origin}/profile` },
    );
    setEmailLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Confirmation link sent. Check both your old and new inbox.");
    setNewEmail("");
  };

  const sendCode = async () => {
    setPwLoading(true);
    const { error } = await supabase.auth.reauthenticate();
    setPwLoading(false);
    if (error) return toast.error(error.message);
    setCodeSent(true);
    toast.success(`Verification code sent to ${currentEmail}`);
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) return toast.error("Password needs at least 6 characters");
    if (!code) return toast.error("Enter the code from your email");
    setPwLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword, nonce: code.trim() });
    setPwLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated!");
    setCodeSent(false);
    setCode("");
    setNewPassword("");
  };

  return (
    <section aria-labelledby="security-title">
      <h2 id="security-title" className="font-display text-lg font-bold text-foreground mb-3">Email & password</h2>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        <form onSubmit={changeEmail} className="p-5 space-y-3">
          <Label htmlFor="new-email" className="text-sm font-semibold text-foreground">Change email</Label>
          <p className="text-xs text-muted-foreground">We'll email a confirmation link. The change applies once you confirm.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input id="new-email" type="email" placeholder="new@example.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="h-11" />
            <Button type="submit" disabled={emailLoading} className="h-11">{emailLoading ? "Sending..." : "Send link"}</Button>
          </div>
        </form>

        <form onSubmit={changePassword} className="p-5 space-y-3">
          <Label className="text-sm font-semibold text-foreground">Change password</Label>
          <p className="text-xs text-muted-foreground">For your safety, we'll email you a verification code first.</p>
          {!codeSent ? (
            <Button type="button" variant="outline" onClick={sendCode} disabled={pwLoading} className="h-11">
              {pwLoading ? "Sending..." : "Email me a code"}
            </Button>
          ) : (
            <div className="grid gap-2 sm:grid-cols-[10rem_1fr_auto]">
              <Input aria-label="Verification code" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} className="h-11" />
              <Input aria-label="New password" type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-11" />
              <Button type="submit" disabled={pwLoading} className="h-11">{pwLoading ? "Saving..." : "Update"}</Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
