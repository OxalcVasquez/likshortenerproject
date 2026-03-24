import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getLinksByUserId } from '@/data/links';
import { type ShortUrl } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateLinkDialog } from './CreateLinkDialog';
import { EditLinkDialog } from './EditLinkDialog';
import { DeleteLinkDialog } from './DeleteLinkDialog';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const links: ShortUrl[] = await getLinksByUserId(userId);

  return (
    <div className="min-h-screen bg-pink-400 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <CreateLinkDialog />
        </div>

        {links.length === 0 ? (
          <p className="text-gray-400">
            No links yet. Create your first short link!
          </p>
        ) : (
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.id}>
                <Card className="border-gray-800 bg-gray-900">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between gap-3 text-lg text-white">
                      <div className="flex min-w-0 items-center gap-3">
                        <Badge variant="secondary">/{link.slug}</Badge>
                        <span className="truncate text-sm font-normal text-gray-400">
                          {link.originalUrl}
                        </span>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <EditLinkDialog link={link} />
                        <DeleteLinkDialog link={link} />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-500">
                      Created {new Date(link.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
