import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Association",
    links: [
      { href: "/about", label: "About KBPA" },
      { href: "/what-we-do", label: "What We Do" },
      { href: "/advocacy", label: "Advocacy" },
      { href: "/partners", label: "Partners" },
    ],
  },
  {
    heading: "Players",
    links: [
      { href: "/players", label: "Player Directory" },
      { href: "/join", label: "Join KBPA" },
      { href: "/support", label: "Get Support" },
      { href: "/news", label: "News" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-kbpa-black text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xl font-extrabold text-kbpa-white">KBPA</p>
            <p className="mt-2 max-w-xs text-sm text-white/60">
              The Players Are the Game.
            </p>
            <p className="mt-4 text-xs uppercase tracking-wide text-kbpa-orange">
              Protect &middot; Represent &middot; Educate &middot; Empower &middot; Advocate
            </p>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.heading}>
              <p className="text-sm font-semibold text-kbpa-white">
                {section.heading}
              </p>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-kbpa-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} Kenya Basketball Players Association. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Site by Cognitix
          </p>
        </div>
      </div>
    </footer>
  );
}
