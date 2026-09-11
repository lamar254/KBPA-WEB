import type { CollectionConfig } from "payload";
import { isAdminOrEditor, isPublisherField, isStaffField } from "@/access/roles";

export const News: CollectionConfig = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedAt"],
    group: "Content",
  },
  access: {
    read: ({ req: { user } }) =>
      // Public can only read published articles; staff can read everything.
      user ? true : { status: { equals: "published" } },
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    // Only publishers/admins can move a piece to Published status.
    delete: isAdminOrEditor,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "excerpt", type: "textarea" },
    { name: "body", type: "richText", required: true },
    { name: "featuredImage", type: "upload", relationTo: "media" },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "News", value: "news" },
        { label: "Player Story", value: "player-story" },
        { label: "Statement", value: "statement" },
        { label: "Event Recap", value: "event-recap" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      access: { update: isPublisherField },
      options: [
        { label: "Draft", value: "draft" },
        { label: "In Review", value: "in-review" },
        { label: "Published", value: "published" },
      ],
    },
    { name: "publishedAt", type: "date" },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      access: { update: isStaffField },
    },
  ],
};
