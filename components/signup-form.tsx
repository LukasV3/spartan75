import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SignupForm() {
  return (
    <DialogContent>
      <Card className="border-0 shadow-none">
        <DialogHeader>
          <CardHeader>
            <DialogTitle className="text-2xl">Signup</DialogTitle>

            <DialogDescription>
              Enter your email below to create your account
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
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>

              <Button type="submit" className="w-full">
                Signup
              </Button>

              <Button variant="outline" className="w-full">
                Signup with Google
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </DialogContent>
  );
}
