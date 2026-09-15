import CmsPage from "@/components/CmsPage";

export const revalidate = 60;
export const metadata = { title: "Terms of Use | KBPA" };

export default function TermsPage() {
  return <CmsPage slug="terms" />;
}
