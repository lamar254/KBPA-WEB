import type { CollectionConfig } from "payload";
import { isAdmin, isSupportStaff } from "@/access/roles";

// Confidential enquiry workflow. Never exposed publicly beyond create —
// read/update/delete are restricted to Support Staff and Admins.
export const SupportCases: CollectionConfig = {
  slug: "support-cases",
  admin: {
    useAsTitle: "referenceNumber",
    defaultColumns: ["referenceNumber", "category", "status", "assignedTo"],
    group: "Support",
  },
  access: {
    create: () => true,
    read: isSupportStaff,
    update: isSupportStaff,
    delete: isAdmin,
  },
  fields: [
    {
      name: "referenceNumber",
      type: "text",
      unique: true,
      admin: {
        readOnly: true,
        description: "Auto-generated and shown to the submitter as a tracking reference.",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Legal / Rights", value: "legal-rights" },
        { label: "Welfare", value: "welfare" },
        { label: "Contract / Agent", value: "contract-agent" },
        { label: "Career", value: "career" },
        { label: "Other", value: "other" },
      ],
    },
    { name: "description", type: "textarea", required: true },
    {
      name: "attachments",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "submittedBy",
      type: "group",
      label: "Submitted By",
      admin: {
        description:
          "Contact details captured at submission. Will link to Members once Phase 2 auth exists.",
      },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "phone", type: "text" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "In Review", value: "in-review" },
        { label: "In Progress", value: "in-progress" },
        { label: "Resolved", value: "resolved" },
        { label: "Closed", value: "closed" },
      ],
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "internalNotes",
      type: "array",
      label: "Internal Notes (staff only)",
      fields: [
        { name: "author", type: "relationship", relationTo: "users", required: true },
        { name: "note", type: "textarea", required: true },
        {
          name: "timestamp",
          type: "date",
          defaultValue: () => new Date().toISOString(),
        },
      ],
    },
    {
      name: "caseHistory",
      type: "array",
      label: "Case History (auto-logged)",
      admin: { readOnly: true },
      fields: [
        { name: "status", type: "text", required: true },
        { name: "changedBy", type: "relationship", relationTo: "users" },
        {
          name: "timestamp",
          type: "date",
          defaultValue: () => new Date().toISOString(),
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc, req }) => {
        if (!data.referenceNumber) {
          data.referenceNumber = `SC-${new Date().getFullYear()}-${Math.floor(
            10000 + Math.random() * 90000,
          )}`;
        }
        if (originalDoc && originalDoc.status !== data.status) {
          data.caseHistory = [
            ...(originalDoc.caseHistory ?? []),
            {
              status: data.status,
              changedBy: req.user?.id ?? null,
              timestamp: new Date().toISOString(),
            },
          ];
        }
        return data;
      },
    ],
  },
};
