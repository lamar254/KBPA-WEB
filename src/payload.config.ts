import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { Members } from "@/collections/Members";
import { SupportCases } from "@/collections/SupportCases";
import { News } from "@/collections/News";
import { Events } from "@/collections/Events";
import { Resources } from "@/collections/Resources";
import { Partners } from "@/collections/Partners";
import { Pages } from "@/collections/Pages";
import { SiteSettings } from "@/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Members,
    SupportCases,
    News,
    Events,
    Resources,
    Partners,
    Pages,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ""].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ""].filter(Boolean),
});
