// src/components/AnimatedImageCard.tsx
"use client"; // Nécessaire pour les effets de survol interactifs

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Pour une animation plus fluide au survol

interface AnimatedImageCardProps {
  imageUrl: string;
  altText: string;
  initialRotation: number; // ex: 6 ou -12
}

const AnimatedImageCard = ({ imageUrl, altText, initialRotation }: AnimatedImageCardProps) => {
  return (
    <motion.div
      className="relative w-full h-64 sm:h-80 md:w-1/4 px-2 mb-4" // Ajustez la taille/marge si besoin
      initial={{ rotate: initialRotation, y: 0 }}
      whileHover={{
        rotate: 0,
        y: -48, // translate-y-12
        scale: 1.5,
        zIndex: 10, // Pour passer au-dessus des autres images
        transition: { duration: 0.5, ease: "circOut" } // duration-500
      }}
      // Applique l'origine de la transformation en bas
      style={{ transformOrigin: 'bottom' }}
    >
      <Link href="#_">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          className="rounded-xl object-cover shadow-lg"
          priority={false} // Mettre à true seulement pour les 1-2 premières images visibles
        />
      </Link>
    </motion.div>
  );
};

export default AnimatedImageCard;