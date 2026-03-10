"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroCTA() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <SignUpButton mode="modal">
        <Button
          size="lg"
          className="w-full gap-2 bg-white text-black hover:bg-white/90 sm:w-auto"
        >
          Get Started Free
          <ArrowRight className="size-4" />
        </Button>
      </SignUpButton>
      <SignInButton mode="modal">
        <Button
          variant="outline"
          size="lg"
          className="w-full gap-2 sm:w-auto"
        >
          <LogIn className="size-4" />
          Sign In
        </Button>
      </SignInButton>
    </div>
  );
}
