"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SignUp } from "@clerk/nextjs";
import App from "@/app/page";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <Dialog defaultOpen={true} onOpenChange={() => router.push("/")}>
      <DialogContent>
        <SignUp />
      </DialogContent>

      <App />
    </Dialog>
  );
}
