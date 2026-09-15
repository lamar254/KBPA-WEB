"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "news", label: "News" },
  { value: "player-story", label: "Player Story" },
  { value: "statement", label: "Statement" },
  { value: "event-recap", label: "Event Recap" },
];

const CATEGORY_LABELS: Record<string, string> = {
  news: "News",
  "player-story": "Player Story",
  statement: "Statement",
  "event-recap": "Event Recap",
};

export type NewsListItem = {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string | null;
  publishedAt: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  videoUrl: string | null;
};

export default function NewsFilterGrid({
  articles,
}: {
  articles: NewsListItem[];
}) {
  const [activeCategory, setActiveCategory] = useState("");

  const filtered = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles;

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
      <aside>
        <nav className="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value || "all"}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors lg:rounded-lg lg:border-0 lg:px-3 lg:py-2 ${
                  isActive
                    ? "border-kbpa-black bg-kbpa-black text-kbpa-white"
                    : "border-black/15 text-black/60 hover:bg-kbpa-off-white hover:text-kbpa-black lg:border-0"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <div>
        {filtered.length === 0 ? (
          <p className="text-sm text-black/60">
            No articles{activeCategory ? " in this category" : ""} yet. Check
            back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-kbpa-off-white transition-colors hover:border-kbpa-orange"
              >
                <div className="relative aspect-[16/10] w-full bg-kbpa-black/90">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt ?? item.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
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
                  <h2 className="mt-2 text-base font-bold text-kbpa-black">
                    {item.title}
                  </h2>
                  {item.excerpt && (
                    <p className="mt-2 text-sm text-black/60">
                      {item.excerpt}
                    </p>
                  )}
                  {item.publishedAt && (
                    <span className="mt-auto pt-4 text-xs text-black/40">
                      {new Date(item.publishedAt).toLocaleDateString(
                        "en-KE",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
