'use client';

import { Game } from '@/lib/api'; 
import Image from 'next/image';

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const isFinished = game.event_status === 'Finished';
  
  
  const gameDateTimeString = `${game.event_date}${game.event_time ? `T${game.event_time}` : ''}`;
  const gameDate = new Date(gameDateTimeString);

  
  const isValidDate = !isNaN(gameDate.getTime());
  
  const formattedTime = isValidDate ? gameDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : 'N/A';
  const formattedDateInfo = isValidDate ? gameDate.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'numeric' }) : '';
  
  const bgColors = [
    'from-orange-600 via-neutral-900 to-blue-900',
    'from-purple-600 via-neutral-900 to-yellow-600',
    'from-red-700 via-neutral-900 to-green-800',
  ];
  
  const bgColorClass = bgColors[parseInt(game.event_key || '0', 10) % bgColors.length];

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 h-full">
      
      
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${bgColorClass} opacity-80 dark:opacity-100`} />

      
      <div className="px-5 pt-4 text-lg font-semibold uppercase text-white/80">
        {game.league_round || game.league_name} · {formattedDateInfo}
      </div>

      
      <div className="z-10 flex flex-grow flex-col items-center justify-center p-5 text-white min-h-[160px]">
        {isFinished ? (
          
          <div className="flex w-full items-center justify-between">
            <TeamDisplay 
              logo={game.event_home_team_logo}
              name={game.event_home_team}
            />
            <div className="text-4xl font-bold tracking-tight">
              {game.event_final_result || 'N/A'} 
            </div>
            <TeamDisplay 
              logo={game.event_away_team_logo}
              name={game.event_away_team}
            />
          </div>
        ) : (
          
          <div className="flex w-full items-center justify-between">
            <TeamDisplay 
              logo={game.event_home_team_logo}
              name={game.event_home_team}
            />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{formattedTime}</span>
              <span className="text-sm text-gray-300">{game.event_status}</span>
            </div>
            <TeamDisplay 
              logo={game.event_away_team_logo}
              name={game.event_away_team}
            />
          </div>
        )}
      </div>
      
      
      <div className="z-10 mt-auto flex border-t border-white/20 bg-black/20 dark:bg-black/40 backdrop-blur-sm">
        <a href="#" className="flex-1 py-3 text-center text-xs font-semibold uppercase text-white/80 transition-colors hover:bg-white/10 hover:text-white">
          {isFinished ? 'Résumé' : 'Preview'}
        </a>
        <a href="#" className="flex-1 border-l border-white/20 py-3 text-center text-xs font-semibold uppercase text-white/80 transition-colors hover:bg-white/10 hover:text-white">
          {isFinished ? 'Stats' : 'Séries'}
        </a>
      </div>
    </div>
  );
};


const TeamDisplay = ({ logo, name }: { logo: string | null; name: string }) => (
  <div className="flex w-1/3 flex-col items-center text-center">
    <div className="relative h-12 w-12 sm:h-16 sm:w-16">
      <Image 
        src={logo || '/default-logo.jpeg'} 
        alt={name || 'Équipe'}
        fill
        sizes="(max-width: 640px) 48px, 64px"
        className="object-contain rounded drop-shadow-lg"
        onError={(e) => { e.currentTarget.src = '/default-logo.jpeg'; }} 
      />
    </div>
    <span className="mt-2 text-xs sm:text-sm font-semibold text-shadow">{name || 'N/A'}</span>
  </div>
);

export default GameCard;

