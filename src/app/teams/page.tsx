import { getTeams } from '@/lib/api';
import TeamCard from '@/components/TeamCard';

const LEAGUE_ID = "757";

export default async function TeamsPage() {
  const teams = await getTeams(LEAGUE_ID);

  return (
    <div className='mt-28' >
      <div className="text-center mb-20">
        
        <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white " 
            >
          Toutes les Équipes
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mt-5">Découvrez les acteurs de la ligue</p>
      </div>
      
      {teams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard key={team.team_key} team={team} />
          ))}
        </div>
      ) : (
        
        <p className="rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 text-center text-gray-700 dark:text-gray-400">
          Aucune équipe trouvée.
        </p>
      )}
    </div>
  );
}
