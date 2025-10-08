// src/app/teams/page.tsx
import { getTeams } from '@/lib/api';
import TeamCard from '@/components/TeamCard'; // Nous allons créer ce composant juste après

const LEAGUE_ID_NBA = "766"; // L'ID pour la NBA que nous avons trouvé dans la doc

export default async function TeamsPage() {
  // Appel à l'API côté serveur, au moment du rendu de la page
  const teams = await getTeams(LEAGUE_ID_NBA);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Toutes les Équipes</h1>

      {teams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.team_key} team={team} />
          ))}
        </div>
      ) : (
        <p>Aucune équipe trouvée.</p>
      )}

    </div>
  );
}