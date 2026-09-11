import type { Access, FieldAccess } from "payload";
import type { User } from "@/payload-types";

export type Role = User["role"];

export const hasRole = (user: User | null | undefined, ...roles: Role[]) =>
  Boolean(user && roles.includes(user.role));

export const isAdmin: Access = ({ req: { user } }) => hasRole(user, "admin");

export const isAdminOrEditor: Access = ({ req: { user } }) =>
  hasRole(user, "admin", "editor");

export const isStaff: Access = ({ req: { user } }) =>
  hasRole(user, "admin", "editor", "publisher", "support-staff");

export const isSupportStaff: Access = ({ req: { user } }) =>
  hasRole(user, "admin", "support-staff");

export const isPublisher: Access = ({ req: { user } }) =>
  hasRole(user, "admin", "publisher");

export const isAdminField: FieldAccess = ({ req: { user } }) =>
  hasRole(user, "admin");

export const isAdminOrEditorField: FieldAccess = ({ req: { user } }) =>
  hasRole(user, "admin", "editor");

export const isPublisherField: FieldAccess = ({ req: { user } }) =>
  hasRole(user, "admin", "publisher");

export const isStaffField: FieldAccess = ({ req: { user } }) =>
  hasRole(user, "admin", "editor", "publisher", "support-staff");
