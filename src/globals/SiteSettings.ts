import type { GlobalConfig } from "payload";
import { isAdminOrEditor } from "@/access/roles";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: { group: "Content" },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: { description: "Shown in the site header." },
    },
  ],
};
