"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const CATEGORY_LABELS: Record<string, string> = {
  news: "News",
  "player-story": "Player Story",
  statement: "Statement",
  "event-recap": "Event Recap",
};

export type NewsCardData = {
  id: number;
  slug: string;
  title: string;
  category: string;
  publishedAt: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  videoUrl: string | null;
};

export default function NewsCarousel({ items }: { items: NewsCardData[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-news-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="relative mt-10">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <Link
            key={item.id}
            data-news-card
            href={`/news/${item.slug}`}
            className="group flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-black/10 bg-kbpa-white transition-colors hover:border-kbpa-orange sm:w-[45%] lg:w-[31%]"
          >
            <div className="relative aspect-[16/10] w-full bg-kbpa-black/90">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt ?? item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 85vw"
                />
              ) : item.videoUrl ? (
                <video
                  src={item.videoUrl}
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-kbpa-orange">
                {CATEGORY_LABELS[item.category] ?? item.category}
              </span>
              <h3 className="mt-2 text-base font-bold text-kbpa-black">
                {item.title}
              </h3>
              {item.publishedAt && (
                <span className="mt-auto pt-4 text-xs text-black/40">
                  {new Date(item.publishedAt).toLocaleDateString("en-KE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous articles"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-kbpa-black transition-colors hover:border-kbpa-orange hover:text-kbpa-orange"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next articles"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-kbpa-black transition-colors hover:border-kbpa-orange hover:text-kbpa-orange"
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
