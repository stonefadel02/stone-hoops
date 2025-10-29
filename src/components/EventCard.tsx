// src/components/EventCard.tsx
"use client";

import { Game } from '@/lib/api'; // Utilise l'interface Game de votre ancienne API
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes'; // Pour adapter le thème

interface EventCardProps {
  game: Game;
  colorIndex?: number;
}

const EventCard = ({ game, colorIndex = 1 }: EventCardProps) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  
  const backgroundStyle = {
      '--gradient-start': colorIndex === 1 ? '#ffbc00' : (colorIndex === 2 ? '#03a9f4' : '#4dff03'),
      '--gradient-end': colorIndex === 1 ? '#ff0058' : (colorIndex === 2 ? '#ff0058' : '#00d0ff'),
  };
  const dynamicBackgroundClass = `
    before:bg-[linear-gradient(315deg,var(--gradient-start),var(--gradient-end))]
    after:bg-[linear-gradient(315deg,var(--gradient-start),var(--gradient-end))]
  `;


  return (
  
    <div
      className={`animated-card-container ${dynamicBackgroundClass} ${currentTheme === 'light' ? 'light' : ''}`}
      style={backgroundStyle as React.CSSProperties}
    >
      {/* Span pour les effets décoratifs */}
      <span className="decorative-span"></span>
      {/* Contenu réel de la carte */}
      <div className="animated-card-content">
        <div className="flex items-center mb-3 space-x-3">
            <Image
                src={game.event_home_team_logo || '/default-logo.png'}
                alt={game.event_home_team}
                width={32} height={32} className="object-contain"
             />
             <span className="font-semibold">{game.event_home_team}</span>
             <span className="text-xl font-bold">{game.event_final_result.split(' - ')[0]}</span>
        </div>
         <div className="flex items-center mb-4 space-x-3">
             <Image
                src={game.event_away_team_logo || '/default-logo.png'}
                alt={game.event_away_team}
                width={32} height={32} className="object-contain"
             />
            <span className="font-semibold">{game.event_away_team}</span>
            <span className="text-xl font-bold">{game.event_final_result.split(' - ')[1]}</span>
        </div>

        <p className="text-xs opacity-80 mb-1">
          {new Date(game.event_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
          {game.event_time ? ` - ${game.event_time.substring(0,5)}` : ''}
        </p>
         <p className="text-xs font-medium uppercase opacity-90">{game.league_name}</p>

       
      </div>
    </div>
  );
};

export default EventCard;