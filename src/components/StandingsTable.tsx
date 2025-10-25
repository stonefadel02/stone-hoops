import { Standing } from '@/lib/api';
import Link from 'next/link';

interface StandingsTableProps {
  standings: Standing[];
}

const StandingsTable = ({ standings }: StandingsTableProps) => {
  return (
    // Conteneur : fond blanc en clair, fond sombre en dark
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl">
      <table className="min-w-full text-left text-sm whitespace-nowrap">
        
        {/* En-tête du tableau : fond gris clair en clair, fond plus sombre en dark */}
        <thead className="uppercase tracking-wider border-b border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50 text-gray-500 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-4 font-semibold">#</th>
            <th scope="col" className="px-6 py-4 font-semibold">Équipe</th>
            <th scope="col" className="px-6 py-4 text-center font-semibold">J</th>
            <th scope="col" className="px-6 py-4 text-center font-semibold">G</th>
            <th scope="col" className="px-6 py-4 text-center font-semibold">P</th>
          </tr>
        </thead>
        
        {/* Corps du tableau : texte noir en clair, texte blanc en dark */}
        <tbody className="text-neutral-900 dark:text-white">
          {standings.map((standing) => (
            <tr 
              key={standing.team_key} 
              // Lignes avec bordures et survol adaptés aux deux modes
              className="border-b border-gray-100 dark:border-neutral-800 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-800/50"
            >
              <th scope="row" className="px-6 py-4 font-medium">
                {standing.standing_place}
              </th>
              <td className="px-6 py-4">
                <Link 
                  href={`/teams/${standing.team_key}`} 
                  // Lien avec texte noir/blanc et survol rouge
                  className="font-medium text-neutral-900 dark:text-white hover:text-red-500 transition-colors"
                >
                  {standing.standing_team}
                </Link>
              </td>
              <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">{standing.standing_P}</td>
              <td className="px-6 py-4 text-center font-bold text-green-500">{standing.standing_W}</td>
              <td className="px-6 py-4 text-center font-bold text-red-500">{standing.standing_L}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;

