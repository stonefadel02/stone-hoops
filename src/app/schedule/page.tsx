// src/app/schedule/page.tsx
import { getRecentResults } from '@/lib/api';
import GameCard from '@/components/GameCard';

const LEAGUE_ID_NBA = "766";

export default async function SchedulePage() {
  const recentGames = await getRecentResults(LEAGUE_ID_NBA);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Résultats Récents</h1>
      
      {recentGames.length > 0 ? (
        <div className="space-y-4">
          {recentGames.map((game) => (
            <GameCard key={game.event_key} game={game} />
          ))}
        </div>
      ) : (
        <p>Aucun résultat récent trouvé pour la semaine passée.</p>
      )}
    </div>
  );
}