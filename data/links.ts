import { desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { shortUrls, type ShortUrl } from '@/db/schema';

export async function getLinksByUserId(userId: string): Promise<ShortUrl[]> {
  return db
    .select()
    .from(shortUrls)
    .where(eq(shortUrls.userId, userId))
    .orderBy(desc(shortUrls.createdAt));
}

export async function getLinkBySlug(
  slug: string,
): Promise<ShortUrl | undefined> {
  const results = await db
    .select()
    .from(shortUrls)
    .where(eq(shortUrls.slug, slug))
    .limit(1);

  return results[0];
}
