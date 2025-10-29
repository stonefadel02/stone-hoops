"use client";

import { Team } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import '../app/css/TeamSlideCard.css'; // Importe le CSS de l'animation

interface TeamHoverCardProps {
  team: Team;
  colorClass: string; // ex: 'bg-teal-500'
}

const TeamHoverCard = ({ team, colorClass }: TeamHoverCardProps) => {
  const [imgSrc, setImgSrc] = useState(team.team_logo || '/default-logo.png');

  return (
    <div className="team-card-container">
      
      {/* Slide 1: Contenu Caché (Texte "Voir Plus") */}
      <div className="team-card-slide team-card-slide1">
        <div className="content text-center">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            {team.team_name}
          </h3>
          <Link 
            href={`/teams/${team.team_key}`} 
            className="inline-block px-6 py-2 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
          >
            Voir Plus
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

      {/* Slide 2: Carte Visible (Style LNB) */}
      <div className={`team-card-slide team-card-slide2 ${colorClass} p-6`}>
        <div className="relative w-full h-full flex flex-col justify-center items-center">
          
          {/* Cercle blanc pour le logo */}
          <div className="relative w-24 h-24 md:w-28 md:h-28 bg-white/90 rounded-full shadow-lg flex items-center justify-center mb-4">
            <Image
              src={imgSrc}
              alt={`Logo de ${team.team_name}`}
              width={80}
              height={80}
              className="object-contain p-2"
              onError={() => setImgSrc('/default-logo.png')}
            />
          </div>
          
          {/* Nom de l'équipe */}
          <h2 className="text-2xl font-extrabold text-white uppercase text-center" 
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
            {team.team_name}
          </h2>
        </div>
      </div>
      
    </div>
  );
};

export default TeamHoverCard;