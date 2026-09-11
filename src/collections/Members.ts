import type { CollectionConfig } from "payload";
import { isAdminOrEditor, isAdminOrEditorField, isStaff } from "@/access/roles";

// Schema-ready for Phase 2 login: once auth is added, a `user` relationship
// can be attached to this collection without a migration (see README notes).
export const Members: CollectionConfig = {
  slug: "members",
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "playerCategory", "club", "status", "submittedAt"],
    group: "Membership",
  },
  access: {
    // Public: anyone can submit a membership application (create only).
    create: () => true,
    read: isStaff,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: "fullName", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true },
    { name: "dateOfBirth", type: "date", required: true },
    {
      name: "playerCategory",
      type: "select",
      required: true,
      options: [
        { label: "Men's Professional", value: "mens-pro" },
        { label: "Women's Professional", value: "womens-pro" },
        { label: "Collegiate", value: "collegiate" },
        { label: "Youth / Development", value: "youth" },
        { label: "Retired / Alumni", value: "alumni" },
      ],
    },
    { name: "club", type: "text" },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending-review",
      access: { update: isAdminOrEditorField },
      options: [
        { label: "Pending Review", value: "pending-review" },
        { label: "Approved", value: "approved" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    {
      name: "membershipNumber",
      type: "text",
      unique: true,
      admin: {
        readOnly: true,
        description: "Auto-generated when a membership is approved.",
      },
    },
    {
      name: "documents",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "submittedAt",
      type: "date",
      defaultValue: () => new Date().toISOString(),
      admin: { readOnly: true },
    },
    {
      name: "reviewedBy",
      type: "relationship",
      relationTo: "users",
      access: { update: isAdminOrEditorField },
    },
    {
      name: "reviewNotes",
      type: "textarea",
      access: { update: isAdminOrEditorField },
    },
    {
      name: "consentGiven",
      type: "checkbox",
      required: true,
      label: "I consent to KBPA processing this information for membership purposes",
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (
          data.status === "approved" &&
          originalDoc?.status !== "approved" &&
          !data.membershipNumber
        ) {
          data.membershipNumber = `KBPA-${new Date().getFullYear()}-${Math.floor(
            10000 + Math.random() * 90000,
          )}`;
        }
        return data;
      },
    ],
  },
};
