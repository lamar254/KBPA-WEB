"use client";

import Image from "next/image";

export type TickerGame = {
  id: number;
  homeTeamName: string;
  homeTeamLogo: string | null;
  awayTeamName: string;
  awayTeamLogo: string | null;
  kickoffAt: string;
  channel: string | null;
  youtubeUrl: string | null;
};

function TeamLogo({ url, name }: { url: string | null; name: string }) {
  return url ? (
    <Image
      src={url}
      alt={name}
      width={24}
      height={24}
      className="h-6 w-6 shrink-0 rounded-full object-cover"
    />
  ) : (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white/60">
      {name.slice(0, 1)}
    </span>
  );
}

function GameCard({ game }: { game: TickerGame }) {
  const kickoff = new Date(game.kickoffAt);
  const timeLabel = kickoff.toLocaleString("en-KE", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="flex shrink-0 items-center gap-3 border-r border-white/10 px-6 py-2.5 text-white">
      <div className="flex items-center gap-1.5">
        <TeamLogo url={game.homeTeamLogo} name={game.homeTeamName} />
        <span className="text-sm font-semibold">{game.homeTeamName}</span>
      </div>
      <span className="text-xs text-white/40">vs</span>
      <div className="flex items-center gap-1.5">
        <TeamLogo url={game.awayTeamLogo} name={game.awayTeamName} />
        <span className="text-sm font-semibold">{game.awayTeamName}</span>
      </div>

      <span className="ml-2 text-xs text-white/60">{timeLabel}</span>

      {game.channel && (
        <span className="rounded-full border border-white/20 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white/70">
          {game.channel}
        </span>
      )}

      {game.youtubeUrl && (
        <a
          href={game.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white transition-colors hover:bg-red-500"
        >
          <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5v-7l6.3 3.5-6.3 3.5Z" />
          </svg>
          Watch
        </a>
      )}
    </div>
  );
}

export default function GamesTickerMarquee({
  games,
}: {
  games: TickerGame[];
}) {
  return (
    <div className="group relative overflow-hidden bg-kbpa-charcoal">
      <div className="flex w-max animate-ticker group-hover:[animation-play-state:paused]">
        {[...games, ...games].map((game, i) => (
          <GameCard key={`${game.id}-${i}`} game={game} />
        ))}
      </div>
    </div>
  );
}
