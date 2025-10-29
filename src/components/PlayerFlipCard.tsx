"use client";

import { Player } from '@/lib/api';
import Image from 'next/image';
import { useState } from 'react';
import '../app/css/PlayerCardFlip.css';

interface PlayerFlipCardProps {
  player: Player;
}

// Tableau d'images des joueurs (identique à celui du sponsor)
const playerImages = [
  { id: 1, url: '/images/webp.jpg', alt: 'Joueur 1' },
  { id: 2, url: '/images/webp2.webp', alt: 'Joueur 2' },
  { id: 3, url: '/images/webp3.webp', alt: 'Joueur 3' },
  { id: 4, url: '/images/webp5.webp', alt: 'Joueur 4' },
  { id: 5, url: '/images/webp6.webp', alt: 'Joueur 5' },
];

// Fonction pour obtenir une image aléatoire
function getRandomPlayerImage() {
  const randomIndex = Math.floor(Math.random() * playerImages.length);
  return playerImages[randomIndex];
}

const PlayerFlipCard = ({ player }: PlayerFlipCardProps) => {
  // Récupère une image aléatoire pour ce joueur
  const randomPlayerImage = getRandomPlayerImage();

  const playerInfo = {
    name: player.player || "Nom Inconnu",
    date: "15 Sep 1993",
    countryCode: "GER",
    imageUrl: randomPlayerImage.url,
  };

  const [imgSrc, setImgSrc] = useState(playerInfo.imageUrl);

  return (
    <div className="player-card-flip-container">
      <div className="player-card-flip">
        {/* Face 1: Informations */}
        <div className="face face1">
          <div className="content">
            <h3 className="text-neutral-900 dark:text-white">{playerInfo.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{playerInfo.date}</p>
            <p className="mt-2 text-xl">{/* 🇩🇪 */}</p>
          </div>
        </div>

        {/* Face 2: Image */}
        <div className="face face2">
          <Image
            src={imgSrc}
            alt={`Photo de ${playerInfo.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
            onError={() => setImgSrc('/images/player-placeholder.png')}
          />
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <h3 className="text-white text-lg font-semibold truncate">{playerInfo.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerFlipCard;