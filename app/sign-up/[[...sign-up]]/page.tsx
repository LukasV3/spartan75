"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SignUp } from "@clerk/nextjs";
import App from "@/app/page";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <Dialog defaultOpen={true} onOpenChange={() => router.push("/")}>
      <DialogContent>
        {/* to ensure accessibility for screen reader users a dialog title is needed. */}
        <VisuallyHidden asChild>
          <DialogTitle>Sign Up</DialogTitle>
        </VisuallyHidden>

        <SignUp />
      </DialogContent>

      <App />
    </Dialog>
  );
}
