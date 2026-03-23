"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type ShortUrl } from "@/db/schema";
import { deleteLink } from "./actions";

type DeleteLinkDialogProps = {
  link: ShortUrl;
};

export function DeleteLinkDialog({ link }: DeleteLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    setError(null);

    startTransition(async () => {
      const result = await deleteLink({ id: link.id });
      if (!result.success) {
        setError(result.error ?? "Something went wrong.");
        return;
      }
      setOpen(false);
    });
  }

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (!value) setError(null);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Delete short link</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-white">/{link.slug}</span>? This action cannot be
            undone.
          </p>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              className="text-gray-400 hover:text-white"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete link"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
