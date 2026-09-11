import type { CollectionConfig } from "payload";
import { isAdminOrEditor } from "@/access/roles";

export const Partners: CollectionConfig = {
  slug: "partners",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "tier"],
    group: "Content",
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media", required: true },
    { name: "website", type: "text" },
    {
      name: "tier",
      type: "select",
      options: [
        { label: "Strategic", value: "strategic" },
        { label: "Supporting", value: "supporting" },
        { label: "In-Kind", value: "in-kind" },
      ],
    },
    { name: "description", type: "textarea" },
  ],
};
