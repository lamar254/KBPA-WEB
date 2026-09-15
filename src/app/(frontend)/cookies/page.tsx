import CmsPage from "@/components/CmsPage";

export const revalidate = 60;
export const metadata = { title: "Cookie Policy | KBPA" };

export default function CookiesPage() {
  return <CmsPage slug="cookies" />;
}
