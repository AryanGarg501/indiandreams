import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password needs at least 6 characters");
    if (password !== confirm) return toast.error("Passwords don't match");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated!");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <Link to="/" className="font-display text-3xl font-bold text-gradient mb-10">Indian Dreams</Link>
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-foreground mb-3">Choose a new password</h1>
        {!ready ? (
          <p className="text-muted-foreground text-sm leading-relaxed">
            Checking your reset link… If nothing happens, the link may have expired.{" "}
            <Link to="/forgot-password" className="text-primary hover:underline">Request a new one</Link>.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground text-sm">New password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 border-border bg-card" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-muted-foreground text-sm">Confirm password</Label>
              <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="h-12 border-border bg-card" />
            </div>
            <Button type="submit" variant="hero" className="w-full h-12 text-base rounded-lg" disabled={loading}>
              {loading ? "Saving..." : "Update password"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
