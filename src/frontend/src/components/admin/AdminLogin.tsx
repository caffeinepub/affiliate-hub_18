import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
  isLoggingIn: boolean;
  onBack: () => void;
}

export function AdminLogin({ onLogin, isLoggingIn, onBack }: AdminLoginProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <button
          type="button"
          onClick={onBack}
          className="text-xs uppercase tracking-[0.18em] font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Maison
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm mx-auto px-4">
          {/* Decorative top border */}
          <div className="h-px bg-border mb-12" />

          <div className="text-center mb-10">
            <p className="font-display italic text-3xl font-semibold text-foreground mb-1">
              Maison
            </p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Admin Access
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h1 className="font-display text-2xl font-medium text-foreground mb-2">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in with Internet Identity to manage your products.
              </p>
            </div>

            <div className="border border-border p-6 bg-card">
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-xs uppercase tracking-[0.15em] font-medium"
                onClick={onLogin}
                disabled={isLoggingIn}
                data-ocid="admin.login_button"
              >
                {isLoggingIn ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Connecting…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign in with Internet Identity
                  </span>
                )}
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Only authorized administrators can access this panel.
            </p>
          </div>

          <div className="h-px bg-border mt-12" />
        </div>
      </div>
    </div>
  );
}
