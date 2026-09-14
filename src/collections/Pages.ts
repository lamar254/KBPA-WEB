import type { CollectionConfig } from "payload";
import { isAdminOrEditor, isPublisherField } from "@/access/roles";
import { slugify } from "@/lib/slugify";

// Flexible content for static pages (About, What We Do, Advocacy) so staff
// can edit copy without a code change.
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status"],
    group: "Content",
  },
  access: {
    read: ({ req: { user } }) =>
      user ? true : { status: { equals: "published" } },
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "body", type: "richText" },
    {
      name: "sections",
      type: "array",
      label: "Sections (alternating layout with images)",
      admin: {
        description:
          "Optional. If used, these render as alternating left/right sections instead of (or in addition to, below) the Body field above.",
      },
      fields: [
        { name: "heading", type: "text" },
        { name: "body", type: "richText", required: true },
        { name: "image", type: "upload", relationTo: "media" },
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
        { label: "Published", value: "published" },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Sanitize whatever was typed, but never fall back to title here:
        // fixed routes (About, What We Do, ...) rely on exact known slugs.
        if (data?.slug) {
          data.slug = slugify(data.slug);
        }
        return data;
      },
    ],
  },
};
