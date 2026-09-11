import type { CollectionConfig } from "payload";
import { isAdminOrEditor } from "@/access/roles";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "location"],
    group: "Content",
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "richText" },
    { name: "date", type: "date", required: true },
    { name: "location", type: "text" },
    { name: "registrationLink", type: "text" },
    { name: "featuredImage", type: "upload", relationTo: "media" },
  ],
};
