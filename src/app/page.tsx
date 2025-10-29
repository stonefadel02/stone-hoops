// src/app/page.tsx
"use client"; // Nécessaire pour HeroCarousel et useEffect
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection'; // Pour les sections suivantes
import { useState, useEffect } from 'react';
import { getRecentResults, Game } from '@/lib/api'; // Votre fonction API et le type Game
import HeroCarousel from '@/components/HeroCarousel'; // <--- IMPORTER LE CAROUSEL
import AnimatedEventCard from '@/components/AnimatedEventCard';

// Utilisez l'ID de ligue approprié pour votre API AllSportsAPI
const LEAGUE_ID = "757"; // ou 756

export default function HomePage() {
  // --- État pour stocker les résultats récents (inchangé) ---
  const [recentGames, setRecentGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- useEffect pour récupérer les données côté client (inchangé) ---
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const games = await getRecentResults(LEAGUE_ID);
        setRecentGames(games.slice(0, 3));
      } catch (err) {
        console.error("Erreur fetching recent games:", err);
        setError("Impossible de charger les derniers résultats.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className=" overflow-hidden">

      {/* --- SECTION HÉROS REMPLACÉE PAR LE CAROUSEL --- */}
      <HeroCarousel  />
      {/* --- FIN DU REMPLACEMENT --- */}

     


      {/* --- Section Derniers Résultats (Mise à jour) --- */}
      <AnimatedSection>
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-white">Derniers Résultats</h2>
         {isLoading && (
           <div className="flex justify-center items-center h-48">
             <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-neutral-700 dark:border-neutral-300"></div>
           </div>
         )}
         {error && (
           <p className="text-center text-red-500 bg-red-100 dark:bg-red-900/30 border border-red-500 p-4 rounded-md">{error}</p>
         )}
         {!isLoading && !error && recentGames.length > 0 && (
           // 3. Utiliser le conteneur CSS pour l'animation au lieu de la grille Tailwind
           <div className="card-animation-container">
             {recentGames.map((game, index) => ( // Ajout de 'index'
               // 4. Utiliser le nouveau composant de carte animée
               <AnimatedEventCard key={game.event_key} game={game} index={index} />
             ))}
           </div>
         )}
          {!isLoading && !error && recentGames.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">Aucun résultat récent trouvé pour cette ligue.</p>
          )}
         <div className="text-center mt-12">
            <Link href="/schedule" className="text-[#BD343B] dark:text-[#FF4C54] hover:underline font-semibold text-lg">
                Voir tous les résultats →
            </Link>
         </div>
      </AnimatedSection>

       <AnimatedSection fullWidth={true} className="relative !py-32 md:!py-80 text-center bg-neutral-800 text-white">
        {/* Image de fond */}
        <Image
           src="/images/bask3.jpg" // REMPLACEZ par une image pertinente
           alt="Action basketball"
           fill
           className="object-cover opacity-50 z-0"
        />
        {/* Contenu superposé */}
        <div className="relative z-10">
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">
             Stone Hoops est fait pour
             {/* Conteneur pour aligner avec le texte animé */}
             <span className="dropping-texts-container ml-2">
                {/* Structure HTML pour les mots qui tombent */}
                <span className=" font-bold text-[40px] dropping-texts">
                  <div>Joueurs</div>
                  <div>Fans</div>
                  <div>Équipes</div>
                  <div>VOUS !</div>
                </span>
             </span>
           </h2>
           <p className="text-lg mt-10 text-gray-300 dark:text-gray-400 max-w-xl mx-auto">
             Plongez au cœur de l`action, suivez vos équipes favorites et ne manquez rien de la saison.
           </p>
        </div>
      </AnimatedSection>

     



    </div>
  );
}