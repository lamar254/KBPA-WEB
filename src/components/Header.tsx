import Image from "next/image";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";
import MobileNav from "@/components/MobileNav";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/players", label: "Players" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/advocacy", label: "Advocacy" },
  { href: "/news", label: "News" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export default async function Header() {
  const payload = await getPayloadClient();
  const settings = await payload.findGlobal({
    slug: "site-settings",
    depth: 1,
  });
  const logo =
    settings.logo && typeof settings.logo === "object" ? settings.logo : null;

  return (
    <header className="sticky top-0 z-50 bg-kbpa-black text-kbpa-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {logo && logo.url ? (
            <Image
              src={logo.url}
              alt={logo.alt ?? "KBPA"}
              width={200}
              height={200}
              className="h-20 w-auto object-contain"
              priority
            />
          ) : (
            <span className="text-lg font-extrabold tracking-tight sm:text-xl">
              KBPA
            </span>
          )}
          <span className="hidden text-xs font-medium text-white/60 sm:inline">
            Kenya Basketball Players Association
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-kbpa-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/support"
            className="rounded-full border border-white/30 px-3 py-2 text-xs font-semibold text-white transition-colors hover:border-kbpa-orange hover:text-kbpa-orange sm:px-4 sm:text-sm"
          >
            Get Support
          </Link>
          <Link
            href="/join"
            className="rounded-full bg-kbpa-orange px-3 py-2 text-xs font-semibold text-kbpa-black transition-colors hover:bg-kbpa-orange-dark hover:text-kbpa-white sm:px-4 sm:text-sm"
          >
            Join KBPA
          </Link>
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
