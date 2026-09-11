import type { CollectionConfig } from "payload";
import { isAdminOrEditor } from "@/access/roles";

export const Resources: CollectionConfig = {
  slug: "resources",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "visibility"],
    group: "Content",
  },
  access: {
    // "members-only" visibility is a flag reserved for Phase 2 login gating;
    // in Phase 1 it has no enforcement effect beyond hiding from public listing UI.
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "file", type: "upload", relationTo: "media", required: true },
    { name: "category", type: "text" },
    {
      name: "visibility",
      type: "select",
      required: true,
      defaultValue: "public",
      options: [
        { label: "Public", value: "public" },
        { label: "Members-only (Phase 2)", value: "members-only" },
      ],
    },
  ],
};
