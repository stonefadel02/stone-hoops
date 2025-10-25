'use client'; // Gardez ceci si vous avez besoin d'interactivité (ex: onError)

import { Player } from '@/lib/api'; // Utilise l'interface de l'ancienne API

interface PlayerCardProps {
  player: Player;
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  // Prend les initiales (ex: "J. Tatum" -> "JT")
  const initials = player.player?.split(' ').map(name => name[0]).join('') || '?';

  return (
    <div 
      className="group relative flex flex-col items-center justify-center p-4 min-h-[150px] 
                 overflow-hidden rounded-lg shadow-lg border 
                 border-neutral-200 dark:border-neutral-800 
                 bg-white dark:bg-neutral-900
                 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                 dark:hover:border-neutral-700"
    >
      {/* Optionnel: Fond dégradé subtil */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-neutral-900 dark:via-neutral-800/50 dark:to-neutral-800 opacity-50 dark:opacity-100" />

      {/* Avatar (pas de photo dans l'ancienne API) */}
      <div className="relative h-16 w-16 sm:h-20 sm:w-20 z-10 mb-3 bg-gray-200 dark:bg-neutral-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 text-2xl sm:text-3xl font-bold uppercase">
        {initials}
      </div>

      {/* Nom du joueur */}
      <div className="text-center z-10">
        <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors leading-tight">
          {/* Utilise les données de l'ancienne API : player.player */}
          {player.player || 'Joueur Inconnu'}
        </h3>
        {/* Vous pourriez ajouter le numéro ou la position si disponible */}
        {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">#Numéro / Poste</p> */}
      </div>
    </div>
  );
};

export default PlayerCard;
