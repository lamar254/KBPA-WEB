import CmsPage from "@/components/CmsPage";

export const revalidate = 60;
export const metadata = { title: "Privacy Policy | KBPA" };

export default function PrivacyPage() {
  return <CmsPage slug="privacy" />;
}
