import CmsPage from "@/components/CmsPage";

export const revalidate = 60;
export const metadata = { title: "Advocacy | KBPA" };

export default function AdvocacyPage() {
  return <CmsPage slug="advocacy" />;
}
