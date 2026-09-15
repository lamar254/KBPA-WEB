import { getPayloadClient } from "@/lib/payload";
import GamesTickerMarquee, { type TickerGame } from "./GamesTickerMarquee";

export default async function GamesTicker() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "games",
    where: {
      kickoffAt: { greater_than: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
    },
    sort: "kickoffAt",
    limit: 20,
    depth: 1,
  });

  if (docs.length === 0) return null;

  const games: TickerGame[] = docs.map((game) => ({
    id: game.id,
    homeTeamName: game.homeTeamName,
    homeTeamLogo:
      game.homeTeamLogo && typeof game.homeTeamLogo === "object"
        ? (game.homeTeamLogo.url ?? null)
        : null,
    awayTeamName: game.awayTeamName,
    awayTeamLogo:
      game.awayTeamLogo && typeof game.awayTeamLogo === "object"
        ? (game.awayTeamLogo.url ?? null)
        : null,
    kickoffAt: game.kickoffAt,
    channel: game.channel ?? null,
    youtubeUrl: game.youtubeUrl ?? null,
  }));

  return <GamesTickerMarquee games={games} />;
}
