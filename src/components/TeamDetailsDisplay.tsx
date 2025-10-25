'use client'; // Ce composant est interactif

import { TeamDetails } from '@/lib/api'; // Assurez-vous que l'interface est exportée depuis api.ts
import Image from 'next/image';
import PlayerCard from './PlayerCard'; // Importe PlayerCard

interface TeamDetailsDisplayProps {
  teamDetails: TeamDetails | null; // Accepte les détails ou null
}

export default function TeamDetailsDisplay({ teamDetails }: TeamDetailsDisplayProps) {

  // Gère le cas où les détails n'ont pas pu être chargés
  if (!teamDetails) {
    return (
      <div className="mt-28 flex justify-center items-center">
        <p className="rounded-lg border border-red-400 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center text-red-700 dark:text-red-300">
          Équipe non trouvée ou détails indisponibles.
        </p>
      </div>
    );
  }

  // --- Toute la partie JSX de l'ancienne page est ici ---
  return (
    <div className="mt-28">
      {/* En-tête de l'équipe stylisé */}
      <div className="mb-12 flex flex-col items-center text-center">
        {teamDetails.team_logo && (
          <div className="relative h-24 w-24 sm:h-32 sm:w-32 mb-4">
            <Image
              src={teamDetails.team_logo}
              alt={`Logo de ${teamDetails.team_name}`}
              fill
              sizes="(max-width: 640px) 96px, 128px"
              className="object-contain drop-shadow-lg rounded-full border-2 border-gray-200 dark:border-neutral-700"
              // onError est maintenant dans un Client Component, c'est OK !
              onError={(e) => { e.currentTarget.src = '/default-logo.jpeg'; }} 
            />
          </div>
        )}
        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white mb-2"
            style={{ WebkitTextStroke: '1px rgba(100,100,100,0.2)' }}>
          {teamDetails.team_name}
        </h1>
      </div>

      {/* Section de l'effectif stylisée */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-neutral-900 dark:text-white border-b border-gray-200 dark:border-neutral-700 pb-2">
          Effectif (Roster)
        </h2>
        {teamDetails.players.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {teamDetails.players.map((player) => (
              <PlayerCard key={player.player_id} player={player} />
            ))}
          </div>
        ) : (
           <p className="rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 text-center text-gray-700 dark:text-gray-400">
            Aucun joueur trouvé pour cette équipe.
           </p>
        )}
      </section>
    </div>
  );
}
