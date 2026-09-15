import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "games" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"home_team_name" varchar NOT NULL,
  	"home_team_logo_id" integer,
  	"away_team_name" varchar NOT NULL,
  	"away_team_logo_id" integer,
  	"kickoff_at" timestamp(3) with time zone NOT NULL,
  	"channel" varchar,
  	"youtube_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "games_id" integer;
  ALTER TABLE "games" ADD CONSTRAINT "games_home_team_logo_id_media_id_fk" FOREIGN KEY ("home_team_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "games" ADD CONSTRAINT "games_away_team_logo_id_media_id_fk" FOREIGN KEY ("away_team_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "games_home_team_logo_idx" ON "games" USING btree ("home_team_logo_id");
  CREATE INDEX "games_away_team_logo_idx" ON "games" USING btree ("away_team_logo_id");
  CREATE INDEX "games_updated_at_idx" ON "games" USING btree ("updated_at");
  CREATE INDEX "games_created_at_idx" ON "games" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_games_fk" FOREIGN KEY ("games_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_games_id_idx" ON "payload_locked_documents_rels" USING btree ("games_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "games" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "games" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_games_fk";
  
  DROP INDEX "payload_locked_documents_rels_games_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "games_id";`)
}
