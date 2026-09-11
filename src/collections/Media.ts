import type { CollectionConfig } from "payload";
import { isStaff } from "@/access/roles";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: {
    read: () => true,
    // Public create is required so anonymous membership/support forms can
    // attach documents; update/delete stay staff-only.
    create: () => true,
    update: isStaff,
    delete: isStaff,
  },
  upload: true,
  fields: [{ name: "alt", type: "text" }],
};
