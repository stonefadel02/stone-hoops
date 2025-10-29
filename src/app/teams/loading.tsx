"use client";

import { useEffect } from 'react';

// Interface pour les props, y compris la fonction pour cacher le loader
interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen = ({ onFinished }: SplashScreenProps) => {
  useEffect(() => {
    // Déclenche la fonction onFinished après 1 minute
    const timer = setTimeout(() => {
      onFinished();
    }, 60000); // 60000 millisecondes = 1 minute

    // Nettoie le timer si le composant est démonté avant
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
      {/* Utilise la classe CSS définie dans globals.css */}
      <div className="loader"></div>
    </div>
  );
};

export default SplashScreen;