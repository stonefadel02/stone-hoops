// src/components/RecentResultItem.tsx
import { Game } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

interface RecentResultItemProps {
  game: Game;
}

const RecentResultItem = ({ game }: RecentResultItemProps) => {
  return (
    <Link 
      href={`/schedule`} // Lien exemple (ou vers un résumé de match si vous avez)
      className="flex items-center space-x-4 p-4 rounded-lg bg-white dark:bg-neutral-800 shadow-md border border-gray-200 dark:border-neutral-700/50 hover:bg-gray-50 dark:hover:bg-neutral-700/70 transition-colors"
    >
      {/* Logos */}
      <div className="flex-shrink-0 flex -space-x-2">
         <Image
            src={game.event_home_team_logo || '/default-logo.png'}
            alt={game.event_home_team}
            width={28}
            height={28}
            className="object-contain rounded-full bg-white dark:bg-gray-200 border-2 border-white dark:border-neutral-800"
         />
         <Image
            src={game.event_away_team_logo || '/default-logo.png'}
            alt={game.event_away_team}
            width={28}
            height={28}
            className="object-contain rounded-full bg-white dark:bg-gray-200 border-2 border-white dark:border-neutral-800"
         />
      </div>
      {/* Infos */}
      <div className="flex-grow overflow-hidden">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
          {game.event_home_team} vs {game.event_away_team}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {new Date(game.event_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
          - <span className="font-bold">{game.event_final_result}</span>
        </p>
      </div>
       {/* Flèche */}
       <svg className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
       </svg>
    </Link>
  );
};

export default RecentResultItem;