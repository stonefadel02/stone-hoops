
import { Team } from '@/lib/api'; // Utilise votre interface Team
import Image from 'next/image';
import Link from 'next/link';

interface TeamSidebarCardProps {
  team: Team;
}

const TeamSidebarCard = ({ team }: TeamSidebarCardProps) => {
  return (
    <Link
      href={`/teams/${team.team_key}`}
      className="flex items-center space-x-4 p-4 rounded-lg bg-white dark:bg-neutral-800 shadow-md border border-gray-200 dark:border-neutral-700/50 hover:bg-gray-50 dark:hover:bg-neutral-700/70 transition-colors group"
    >
      <div className="flex-shrink-0 relative w-12 h-12">
        <Image
          src={team.team_logo || '/default-logo.png'}
          alt={`Logo ${team.team_name}`}
          fill
          sizes="48px"
          className="object-contain rounded-full bg-gray-100 dark:bg-gray-700 p-1"
        />
      </div>
      <div className="overflow-hidden">
        <h4 className="text-base font-semibold text-neutral-900 dark:text-white truncate group-hover:text-red-600 dark:group-hover:text-red-400">
          {team.team_name}
        </h4>
        {/* Vous pourriez ajouter la ville ou le classement ici */}
         <p className="text-xs text-gray-500 dark:text-gray-400">Voir les détails</p>
      </div>
      <svg className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-500 ml-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
       </svg>
    </Link>
  );
};

export default TeamSidebarCard;