import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import WhatWeDo from "@/components/home/WhatWeDo";
import PlayersVoice from "@/components/home/PlayersVoice";
import LatestNews from "@/components/home/LatestNews";
import MembershipCta from "@/components/home/MembershipCta";
import Partners from "@/components/home/Partners";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <WhatWeDo />
      <PlayersVoice />
      <LatestNews />
      <MembershipCta />
      <Partners />
    </>
  );
}
