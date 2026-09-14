import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setLoading(true);
    // TODO: connect to auth backend
    setTimeout(() => {
      toast.success("Reset instructions sent! Check your inbox.");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <Link to="/" className="font-display text-3xl font-bold text-gradient mb-10">
        Indian Dreams
      </Link>

      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-foreground mb-3">Forgot password?</h1>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          We'll send you reset instructions.
          <br />
          Please enter the email address associated with your account. If you don't see the email, check your spam or junk folder.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-border bg-card"
            />
          </div>

          <Button
            type="submit"
            variant="hero"
            className="w-full h-12 text-base rounded-lg"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send reset code"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Return to{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
