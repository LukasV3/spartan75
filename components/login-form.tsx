import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type LoginFormProps = {
  onToggleFormClick?: () => void;
};

export function LoginForm({ onToggleFormClick }: LoginFormProps) {
  return (
    <>
      <Card className="border-0 shadow-none">
        <DialogHeader>
          <CardHeader>
            <DialogTitle className="text-2xl">Login</DialogTitle>

            <DialogDescription>
              Enter your email below to login to your account
            </DialogDescription>
          </CardHeader>
        </DialogHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>

              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <span
                onClick={onToggleFormClick}
                className="underline underline-offset-4"
              >
                Sign up
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
