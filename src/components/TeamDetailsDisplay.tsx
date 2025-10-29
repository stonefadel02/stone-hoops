"use client";

import { TeamDetails,  Team } from '@/lib/api';
import Image from 'next/image';
import PlayerFlipCard from './PlayerFlipCard';
import TeamSidebarCard from './TeamSidebarCard';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TeamDetailsDisplayProps {
  teamDetails: TeamDetails | null;
  sidebarTeams: Team[];
}

// Tableau d'images fictives pour le sponsor
const fictiveImages = [
  {
    id: 1,
    url: '/images/webp.jpg',
    alt: 'Image équipe 1',
  },
  {
    id: 2,
    url: '/images/webp2.webp',
    alt: 'Image équipe 2',
  },
  {
    id: 3,
    url: '/images/webp3.webp',
    alt: 'Image équipe 3',
  },
  {
    id: 4,
    url: '/images/webp5.webp',
    alt: 'Image équipe 4',
  },
  {
    id: 5,
    url: '/images/webp6.webp',
    alt: 'Image équipe 5',
  },
];

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * fictiveImages.length);
  return fictiveImages[randomIndex];
}

export default function TeamDetailsDisplay({ teamDetails, sidebarTeams }: TeamDetailsDisplayProps) {
  const [logoSrc, setLogoSrc] = useState(teamDetails?.team_logo || '/default-logo.png');
  const [randomImage, setRandomImage] = useState(getRandomImage());

  // Recharger une nouvelle image aléatoire à chaque changement d'équipe
  useEffect(() => {
    setRandomImage(getRandomImage());
  }, [teamDetails]);

  if (!teamDetails) {
    return (
      <div className="mt-28 flex justify-center items-center">
        <p className="rounded-lg border border-red-400 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center text-red-700 dark:text-red-300">
          Équipe non trouvée ou détails indisponibles.
        </p>
      </div>
    );
  }

  const handleRefreshImage = () => {
    setRandomImage(getRandomImage());
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

      <div className="mb-12 text-center md:text-left">
        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white mb-2"
          style={{ WebkitTextStroke: '1px rgba(100,100,100,0.2)' }}>
          {teamDetails.team_name}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* --- Colonne Principale --- */}
        <div className="lg:w-2/3 space-y-12">

          <section className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700">
            <div className="flex-shrink-0 relative h-24 w-24 sm:h-32 sm:w-32">
              <Image
                src={logoSrc}
                alt={`Logo de ${teamDetails.team_name}`}
                fill
                sizes="(max-width: 640px) 96px, 128px"
                className="object-contain rounded-full border-2 border-gray-300 dark:border-neutral-600 p-1 bg-gray-50 dark:bg-neutral-700"
                onError={() => setLogoSrc('/default-logo.png')}
              />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">À Propos de l`Équipe</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Informations sur l`équipe, son histoire, ses couleurs... (Contenu à ajouter si disponible).
                Actuellement dans la ligue Stone Hoops.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-neutral-900 dark:text-white border-b border-gray-200 dark:border-neutral-700 pb-3">
              Effectif (Roster)
            </h2>
            {teamDetails.players.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
                {teamDetails.players.map((player) => (
                  <PlayerFlipCard key={player.player_id} player={player} />
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 text-center text-gray-700 dark:text-gray-400">
                Aucun joueur trouvé pour cette équipe (données mock ou API).
              </p>
            )}
          </section>

        </div>

        {/* --- Barre Latérale --- */}
        <aside className="lg:w-1/3 space-y-8 lg:sticky lg:top-28 self-start">

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold mb-5 text-neutral-900 dark:text-white">Autres Équipes</h3>
            {sidebarTeams.length > 0 ? (
              <div className="space-y-4">
                {sidebarTeams.map((team) => (
                  <TeamSidebarCard key={team.team_key} team={team} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Aucune autre équipe à afficher.</p>
            )}
            <div className="mt-6 text-center">
              <Link href="/teams" className="text-sm font-semibold text-red-500 dark:text-red-400 hover:underline">
                Voir toutes les équipes
              </Link>
            </div>
          </div>

          {/* Section Sponsor avec IMAGE ALÉATOIRE */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700">
            <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-3">Sponsorisé</h4>
            <div className="aspect-video bg-neutral-100 dark:bg-neutral-700 rounded overflow-hidden relative">
              <Image
                src={randomImage.url}
                alt={randomImage.alt}
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={handleRefreshImage}
              className="mt-3 w-full px-3 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white text-sm font-semibold rounded transition"
            >
              Nouvelle image
            </button>
          </div>

        </aside>

      </div>
    </div>
  );
}