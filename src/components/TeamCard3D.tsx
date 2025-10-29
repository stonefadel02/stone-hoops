// src/components/TeamCard3D.tsx
"use client"; // Pour gérer onError

import { Team } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import '../app/css/TeamCard3D.css'; // Importe le nouveau CSS

interface TeamCard3DProps {
  team: Team;
}

const TeamCard3D = ({ team }: TeamCard3DProps) => {
  const [imgSrc, setImgSrc] = useState(team.team_logo || '/default-logo.png');

  // Choix du dégradé en fonction du thème (peut être affiné)
  // Utilise vos couleurs principales
  const gradientLight = 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)'; // Exemple clair (gris léger)
  const gradientDark = 'linear-gradient(to bottom right, #1f2937, #374151)'; // Exemple sombre (gris foncé)

  return (
    <Link href={`/teams/${team.team_key}`} className="block">
      {/* Applique la classe principale de la carte 3D */}
      <div
        className="team-card-3d"
        // Applique le fond dégradé via style inline (plus simple pour le thème)
        // Note: Pour une meilleure performance, définir via variables CSS serait mieux
        style={{
          background: `var(--card-3d-bg, ${gradientDark})` // Défaut sombre
        }}
        // Change la variable CSS au survol via JS (optionnel, plus complexe)
        // Ou utiliser une classe CSS pour le thème comme avant
      >
        {/* Image */}
        <Image
          src={imgSrc}
          alt={`Logo de ${team.team_name}`}
          fill // Utilise 'fill' pour l'absolu, mais nécessite un conteneur dimensionné
          className="team-card-3d-image" // Classe CSS pour le style et positionnement
          onError={() => setImgSrc('/default-logo.png')}
          sizes="(max-width: 768px) 50vw, 33vw" // Ajuster sizes
        />

        {/* Contenu Texte */}
        {/* Applique les couleurs clair/sombre via Tailwind */}
        <div className="team-card-3d-content bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
          <h3 className="text-neutral-900 dark:text-white">
            {team.team_name}
          </h3>
          {/* Optionnel: Ajouter une description courte si disponible */}
          <p className="text-gray-600 dark:text-gray-400">
            Équipe de la ligue Stone Hoops.
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard3D;