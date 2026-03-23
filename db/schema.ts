import { pgTable, integer, varchar, timestamp, index } from "drizzle-orm/pg-core";

export const shortUrls = pgTable(
  "short_urls",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    userId: varchar("user_id").notNull(),
    slug: varchar("slug", { length: 50 }).unique().notNull(),
    originalUrl: varchar("original_url", { length: 2048 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("user_id_idx").on(table.userId)],
);

export type ShortUrl = typeof shortUrls.$inferSelect;
export type NewShortUrl = typeof shortUrls.$inferInsert;
