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
      admin: {
        description:
          "White/light logo, for use on dark backgrounds (e.g. the site header).",
      },
    },
    {
      name: "logoDark",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Black/dark logo, for use on light or white backgrounds.",
      },
    },
  ],
};
