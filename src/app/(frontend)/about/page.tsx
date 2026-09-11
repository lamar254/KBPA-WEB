import CmsPage from "@/components/CmsPage";

export const revalidate = 60;
export const metadata = { title: "About | KBPA" };

export default function AboutPage() {
  return <CmsPage slug="about" />;
}
