import type { CollectionConfig } from "payload";
import { isAdminOrEditor } from "@/access/roles";

// Powers the scrolling fixtures ticker below the site header.
export const Games: CollectionConfig = {
  slug: "games",
  admin: {
    useAsTitle: "homeTeamName",
    defaultColumns: ["homeTeamName", "awayTeamName", "kickoffAt", "channel"],
    group: "Content",
    description: "Upcoming games shown in the ticker below the header.",
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "homeTeamName", type: "text", required: true, admin: { width: "50%" } },
        { name: "homeTeamLogo", type: "upload", relationTo: "media", admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "awayTeamName", type: "text", required: true, admin: { width: "50%" } },
        { name: "awayTeamLogo", type: "upload", relationTo: "media", admin: { width: "50%" } },
      ],
    },
    { name: "kickoffAt", type: "date", required: true, admin: { date: { pickerAppearance: "dayAndTime" } } },
    { name: "channel", type: "text", admin: { description: "TV/streaming channel showing the game." } },
    { name: "youtubeUrl", type: "text", admin: { description: "Optional link to watch on YouTube." } },
  ],
};
