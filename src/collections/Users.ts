import type { CollectionConfig } from "payload";
import { isAdmin, isAdminField } from "@/access/roles";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
  },
  access: {
    // Any authenticated staff member can see the staff list (e.g. to assign cases),
    // but only admins can create/update/delete accounts or change roles.
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      access: {
        update: isAdminField,
      },
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Support Staff", value: "support-staff" },
        { label: "Publisher", value: "publisher" },
      ],
    },
  ],
};
