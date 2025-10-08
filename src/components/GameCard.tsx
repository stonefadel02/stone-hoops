// src/components/GameCard.tsx
import { Game } from '@/lib/api';
import Image from 'next/image';

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 flex flex-col items-center">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {new Date(game.event_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
      <div className="grid grid-cols-3 items-center w-full">
        {/* Équipe Domicile */}
        <div className="flex flex-col items-center text-center">
          <Image 
            src={game.event_home_team_logo || '/default-logo.png'} 
            alt={game.event_home_team}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="font-semibold mt-1">{game.event_home_team}</span>
        </div>

        {/* Score */}
        <div className="text-center">
          <span className="text-2xl font-bold">{game.event_final_result}</span>
        </div>
        
        {/* Équipe Extérieur */}
        <div className="flex flex-col items-center text-center">
          <Image 
            src={game.event_away_team_logo || '/default-logo.png'} 
            alt={game.event_away_team}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="font-semibold mt-1">{game.event_away_team}</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;