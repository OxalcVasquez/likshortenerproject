'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type ShortUrl } from '@/db/schema';
import { updateLink } from './actions';

type EditLinkDialogProps = {
  link: ShortUrl;
};

export function EditLinkDialog({ link }: EditLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(link.originalUrl);
  const [slug, setSlug] = useState(link.slug);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (!value) {
      setUrl(link.originalUrl);
      setSlug(link.slug);
      setError(null);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await updateLink({ id: link.id, url, slug });
      if (!result.success) {
        setError(result.error ?? 'Something went wrong.');
        return;
      }
      handleOpenChange(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Edit short link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`edit-url-${link.id}`} className="text-gray-300">
              Destination URL
            </Label>
            <Input
              id={`edit-url-${link.id}`}
              type="url"
              placeholder="https://example.com/your-long-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`edit-slug-${link.id}`} className="text-gray-300">
              Short slug
            </Label>
            <Input
              id={`edit-slug-${link.id}`}
              type="text"
              placeholder="my-link"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              required
              className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
            />
            <p className="text-xs text-gray-500">
              Only lowercase letters, numbers, and hyphens.
            </p>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
