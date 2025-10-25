import { getRecentResults, getUpcomingGames } from '@/lib/api'; 
import GameCard from '@/components/GameCard';

const LEAGUE_ID = "757"; 
export default async function SchedulePage() {
  const [recentGames, upcomingGames] = await Promise.all([
    getRecentResults(LEAGUE_ID),
    getUpcomingGames(LEAGUE_ID)
  ]);

  return (
    <div className="mt-28">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-widest text-neutral-900 dark:text-white"
            style={{ WebkitTextStroke: '1px rgba(100,100,100,0.3)' }}>
          Calendrier & Résultats
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Matchs à venir et scores récents</p>
      </div>

        <section className="mb-12" >
        <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Résultats Récents</h2>
        {recentGames.length > 0 ? (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentGames.map((game) => (
              <GameCard key={game.event_key} game={game} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 text-center text-gray-700 dark:text-gray-400">
            Aucun résultat récent trouvé.
          </p>
        )}
      </section>
      <section >
        <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Prochains Matchs</h2>
        {upcomingGames.length > 0 ? (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingGames.map((game) => (
              <GameCard key={game.event_key} game={game} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 text-center text-gray-700 dark:text-gray-400">
            Aucun match à venir dans les 7 prochains jours.
          </p>
        )}
      </section>

      
    
    </div>
  );
}

