import CmsPage from "@/components/CmsPage";

export const revalidate = 60;
export const metadata = { title: "Players | KBPA" };

export default function PlayersPage() {
  return <CmsPage slug="players" />;
}
