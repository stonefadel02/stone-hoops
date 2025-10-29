"use client";

import { Game } from '@/lib/api'; // Utilise l'interface Game de votre ancienne API
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import '../app/css/CardAnimation.css'; // Importe le nouveau CSS

interface AnimatedEventCardProps {
  game: Game;
  index: number; // Pour varier les couleurs
}

const AnimatedEventCard = ({ game, index }: AnimatedEventCardProps) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Applique une classe de couleur différente en boucle (1 à 4)
  const colorClass = `color-${(index % 4) + 1}`;

  const gameDate = new Date(game.event_date + (game.event_time ? `T${game.event_time}` : ''));

  return (
    <div className={`animated-card ${colorClass}`}>
      <span className="decorative-span"></span>
      <div className={`animated-card-content ${currentTheme === 'light' ? 'light' : ''}`}>
        {/* Contenu adapté à vos données 'Game' */}
        <h3 className="text-xs uppercase font-semibold opacity-80 mb-2">
          {game.league_name}
        </h3>
        <h2 className="text-xl font-bold mb-3 line-clamp-2">
          {game.event_home_team} vs {game.event_away_team}
        </h2>
        <div className="flex justify-around items-center mb-4">
          <Image
            src={game.event_home_team_logo || '/default-logo.png'}
            alt={game.event_home_team}
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-lg font-bold opacity-70">VS</span>
          <Image
            src={game.event_away_team_logo || '/default-logo.png'}
            alt={game.event_away_team}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <p className="text-sm font-medium mb-1">
          {gameDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
        <p className="text-sm opacity-80 mb-4">
          {game.event_time ? game.event_time.substring(0, 5) : 'Heure à confirmer'}
        </p>
        
      </div>
    </div>
  );
};

export default AnimatedEventCard;