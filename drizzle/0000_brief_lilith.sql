CREATE TABLE "short_urls" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "short_urls_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" varchar NOT NULL,
	"slug" varchar(50) NOT NULL,
	"original_url" varchar(2048) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "short_urls_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "short_urls" USING btree ("user_id");