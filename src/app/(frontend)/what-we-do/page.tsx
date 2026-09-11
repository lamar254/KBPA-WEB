import CmsPage from "@/components/CmsPage";

export const revalidate = 60;
export const metadata = { title: "What We Do | KBPA" };

export default function WhatWeDoPage() {
  return <CmsPage slug="what-we-do" />;
}
