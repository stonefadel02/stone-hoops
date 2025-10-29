// src/app/schedule/page.tsx
"use client"; // Doit être client pour useState, useEffect et les onglets

import { useState, useEffect } from 'react';
import { getRecentResults, getUpcomingGames, Game } from '@/lib/api';
import AnimatedEventCard from '@/components/AnimatedEventCard'; // Le nouveau composant animé
import RecentResultItem from '@/components/RecentResultItem'; // Le nouveau composant de la barre latérale

const LEAGUE_ID = "757"; // Votre ID de ligue

export default function SchedulePage() {
  // --- Gestion des données ---
  const [recentGames, setRecentGames] = useState<Game[]>([]);
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Gestion des onglets ---
  const [activeTab, setActiveTab] = useState<'basketball' | '3x3'>('basketball');

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Lance les deux appels API en parallèle
        const [recent, upcoming] = await Promise.all([
          getRecentResults(LEAGUE_ID),
          getUpcomingGames(LEAGUE_ID)
        ]);
        setRecentGames(recent);
        setUpcomingGames(upcoming);
      } catch (err) {
        console.error("Erreur fetching schedule data:", err);
        setError("Impossible de charger les données du calendrier.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchScheduleData();
  }, []); // Exécuté une seule fois au chargement

  // --- Données filtrées (pour l'instant, juste un placeholder) ---
  // À l'avenir, vous pourriez filtrer `upcomingGames` selon l'onglet
  const filteredUpcomingGames = activeTab === 'basketball' 
    ? upcomingGames 
    : []; // Mettez les jeux 3x3 ici si vous les avez

  return (
    // Conteneur principal avec padding
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      
      {/* Titre (français, dark/light) */}
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-neutral-900 dark:text-white">Calendrier</h1>

      {/* Structure à deux colonnes */}
      <div className="flex flex-col lg:flex-row gap-12">

        {/* --- Colonne Principale (Gauche) --- */}
        <div className="lg:w-2/3">
          {/* Onglets (français, dark/light) */}
          <div className="flex space-x-1 border-b border-gray-300 dark:border-neutral-700 mb-8">
            <button
              onClick={() => setActiveTab('basketball')}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === 'basketball'
                  ? 'border-b-2 border-red-500 text-neutral-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Basketball
            </button>
            <button
              onClick={() => setActiveTab('3x3')}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === '3x3'
                  ? 'border-b-2 border-red-500 text-neutral-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              3x3 (Bientôt)
            </button>
          </div>

          {/* Barre de Recherche (français, dark/light) */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Rechercher un événement..."
              className="w-full px-4 py-3 pl-10 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          {/* Contenu principal (Matchs à venir) */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-neutral-700 dark:border-neutral-300"></div>
            </div>
          )}
          {error && <p className="text-center py-10 text-red-500">{error}</p>}

          {!isLoading && !error && (
            <div className="space-y-10">
              <section>
                <h2 className="text-xl font-semibold mb-6 text-neutral-900 dark:text-white">Prochains Matchs ({filteredUpcomingGames.length})</h2>
                {filteredUpcomingGames.length > 0 ? (
                  // Utilise le conteneur CSS pour la grille animée
                  <div className="card-animation-container"> 
                    {filteredUpcomingGames.map((game, index) => (
                      <AnimatedEventCard key={game.event_key} game={game} index={index} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-10">Aucun match à venir.</p>
                )}
              </section>
            </div>
          )}
        </div>

        {/* --- Barre Latérale (Droite) --- */}
        <aside className="lg:w-1/3 space-y-8 lg:sticky lg:top-28 self-start"> {/* Sticky sidebar */}
          
          {/* Section "Résultats Récents" */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold mb-5 text-neutral-900 dark:text-white">Résultats Récents</h3>
            {isLoading && <p className="text-xs text-gray-500 dark:text-gray-400">Chargement...</p>}
            {error && <p className="text-xs text-red-500">Erreur de chargement</p>}
            
            {recentGames.length > 0 ? (
              <div className="space-y-4">
                {/* Affiche seulement les 5 plus récents par exemple */}
                {recentGames.slice(0, 5).map((game) => (
                  <RecentResultItem key={game.event_key} game={game} />
                ))}
              </div>
            ) : (
              !isLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Aucun résultat récent.</p>
            )}
            
            <div className="mt-6 text-center">
              {/* Le lien pointe vers cette même page, mais vous pourriez avoir une page dédiée */}
              <a href="/schedule" className="text-sm font-semibold text-red-500 dark:text-red-400 hover:underline">
                Voir tous les résultats
              </a>
            </div>
          </div>

          {/* Section Sponsor (Placeholder) */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700">
             <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-3">Sponsorisé</h4>
             <div className="aspect-video bg-neutral-100 dark:bg-neutral-700 rounded flex items-center justify-center">
                 <p className="text-gray-500 dark:text-gray-400 text-sm">Contenu Sponsor</p>
             </div>
          </div>
        </aside>

      </div>
    </div>
  );
}