// src/app/standings/page.tsx
import { getStandings, Standing } from '@/lib/api';
import StandingsTable from '@/components/StandingsTable';
import StandingsChart from '@/components/StandingsChart';
import ExportButton from '@/components/ExportButton';
import Link from 'next/link';

const LEAGUE_ID = "757";

interface HighlightTeam {
  team_key: string;
  team_name: string;
  standing_place: string;
  change: number;
}

// Données mock en cas d'erreur API
const mockStandings: Standing[] = [
  {
    team_key: '1',
    standing_team: 'Équipe A',
    standing_place: '1',
    standing_P: '10',
    standing_W: '8',
    standing_L: '2',
    league_key: '757',
  },
  {
    team_key: '2',
    standing_team: 'Équipe B',
    standing_place: '2',
    standing_P: '10',
    standing_W: '7',
    standing_L: '3',
    league_key: '757',
  },
  {
    team_key: '3',
    standing_team: 'Équipe C',
    standing_place: '3',
    standing_P: '10',
    standing_W: '6',
    standing_L: '4',
    league_key: '757',
  },
];

export default async function StandingsPage() {
  let standings: Standing[] = [];

  try {
    standings = await getStandings(LEAGUE_ID);
  } catch (error) {
    console.warn('Failed to fetch standings, using mock data:', error);
    standings = mockStandings;
  }

  // Si pas de données, utiliser les mocks
  if (!standings || standings.length === 0) {
    standings = mockStandings;
  }

  // Mapper les données avec team_name
  const standingsWithChange = standings.map((s) => ({
    ...s,
    team_name: s.standing_team,
    change: Math.floor(Math.random() * 21) - 10,
  }));

  const climbers = [...standingsWithChange]
    .sort((a, b) => b.change - a.change)
    .slice(0, 5) as HighlightTeam[];

  const droppers = [...standingsWithChange]
    .sort((a, b) => a.change - b.change)
    .slice(0, 5) as HighlightTeam[];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
          Classement
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* --- Colonne Principale (Gauche) --- */}
        <div className="lg:w-2/3">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <select className="w-full sm:w-auto px-4 py-2.5 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>Dates du Classement</option>
              <option>15 Sept 2025</option>
            </select>
            <ExportButton
              data={standings}
              filename={`classement-${LEAGUE_ID}.csv`}
            />
          </div>

          {standings.length > 0 ? (
            <StandingsTable standings={standings} />
          ) : (
            <p className="rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 text-center text-gray-700 dark:text-gray-400">
              Le classement n`est pas disponible pour le moment.
            </p>
          )}

          {standings.length > 0 && (
            <div className="mt-12">
              <StandingsChart data={standings} />
            </div>
          )}
        </div>

        {/* --- Barre Latérale (Droite) --- */}
        <aside className="lg:w-1/3 space-y-8 lg:sticky lg:top-28 self-start">
          <StandingsHighlightCard
            title="Meilleures Progressions"
            teams={climbers}
            type="climber"
          />

          <StandingsHighlightCard
            title="Plus Fortes Chutes"
            teams={droppers}
            type="dropper"
          />
        </aside>
      </div>
    </div>
  );
}

interface StandingsHighlightCardProps {
  title: string;
  teams: HighlightTeam[];
  type: 'climber' | 'dropper';
}

function StandingsHighlightCard({
  title,
  teams,
  type,
}: StandingsHighlightCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700">
      <h3 className="text-lg font-semibold mb-5 text-neutral-900 dark:text-white">
        {title}
      </h3>
      <table className="min-w-full text-left text-sm whitespace-nowrap">
        <thead className="uppercase tracking-wider text-xs border-b border-gray-200 dark:border-neutral-700 bg-red-600 text-white">
          <tr>
            <th scope="col" className="px-4 py-2 font-semibold">
              #
            </th>
            <th scope="col" className="px-4 py-2 font-semibold">
              Équipe
            </th>
            <th scope="col" className="px-4 py-2 font-semibold text-right">
              +/-
            </th>
          </tr>
        </thead>
        <tbody className="text-neutral-900 dark:text-white">
          {teams.map((team) => (
            <tr
              key={team.team_key}
              className="border-b border-gray-100 dark:border-neutral-700/50"
            >
              <td className="px-4 py-3 font-medium">{team.standing_place}</td>
              <td className="px-4 py-3 font-medium">
                <Link
                  href={`/teams/${team.team_key}`}
                  className="hover:underline"
                >
                  {team.team_name}
                </Link>
              </td>
              <td
                className={`px-4 py-3 font-bold text-right ${
                  type === 'climber' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {type === 'climber' ? '▲' : '▼'} {Math.abs(team.change)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}