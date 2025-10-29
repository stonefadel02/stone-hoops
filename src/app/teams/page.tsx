"use client"; // Nécessaire pour useEffect et Framer Motion

import { useState, useEffect } from 'react';
import { getTeams, getStandings, Team, Standing } from '@/lib/api';
import StandingsTable from '@/components/StandingsTable';
import TeamHoverCard from '@/components/TeamHoverCard'; // Le nouveau composant de carte
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

// Couleurs pour les cartes (style LNB) - basées sur vos couleurs
const teamColors = [
  'bg-[#BD343B]', // Votre rouge principal
  'bg-neutral-800', // Sombre
  'bg-teal-600', // Un bleu/vert
  'bg-red-700', // Un autre rouge
  'bg-sky-700', // Un bleu
  'bg-orange-600', // Un orange
];

// Variants pour l'animation en cascade
const cascadeContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Délai de 0.08s entre chaque carte
    },
  },
};
const cascadeItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TeamsPage() {
  // --- Gestion des données ---
  const [teams, setTeams] = useState<Team[]>([]);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // S'assurer que la clé API est disponible côté client
    if (!process.env.NEXT_PUBLIC_API_KEY) {
      console.error("Clé API non configurée. Assurez-vous que NEXT_PUBLIC_API_KEY est défini.");
      setError("Configuration API manquante.");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [teamsData, standingsData] = await Promise.all([
          getTeams("757"), // Utilise votre LEAGUE_ID
          getStandings("757")
        ]);
        setTeams(teamsData);
        setStandings(standingsData);
      } catch (err) {
        console.error("Erreur fetching data:", err);
        setError("Impossible de charger les données.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // Exécuté une seule fois

  return (
    <div className=" relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      
      {/* Titre (français, dark/light) */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-widest text-neutral-900 dark:text-white"
            style={{ WebkitTextStroke: '1px rgba(100,100,100,0.3)' }}>
          Toutes les Équipes
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3">Découvrez les acteurs de la ligue</p>
      </div>

      {/* Structure à deux colonnes */}
      <div className="flex flex-col lg:flex-row gap-12">

        {/* --- Colonne Principale (Gauche) - Grille des Équipes --- */}
        <div className="lg:w-2/3">
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-neutral-700 dark:border-neutral-300"></div>
            </div>
          )}
          {error && <p className="text-center py-10 text-red-500">{error}</p>}
          
          {!isLoading && !error && teams.length > 0 && (
            // Conteneur pour l'animation en cascade
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 justify-items-center"
              variants={cascadeContainer}
              initial="hidden"
              animate="visible"
            >
              {teams.map((team, index) => (
                // Item de l'animation en cascade
                <motion.div key={team.team_key} variants={cascadeItem}>
                  <TeamHoverCard 
                    team={team} 
                    colorClass={teamColors[index % teamColors.length]} // Applique une couleur en boucle
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
          {!isLoading && !error && teams.length === 0 && (
             <p className="rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 text-center text-gray-700 dark:text-gray-400">
               Aucune équipe trouvée.
             </p>
          )}
        </div>

        {/* --- Barre Latérale (Droite) - Classement --- */}
        <aside className="lg:w-1/3 space-y-8 lg:sticky lg:top-28 self-start">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold mb-5 text-neutral-900 dark:text-white">Aperçu du Classement</h3>
            
            {isLoading && <p className="text-xs text-gray-500 dark:text-gray-400">Chargement...</p>}
            {error && <p className="text-xs text-red-500">Erreur de chargement</p>}

            {standings.length > 0 ? (
              // Affiche seulement les 10 premières équipes
              <StandingsTable standings={standings.slice(0, 10)} />
            ) : (
              !isLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Classement non disponible.</p>
            )}
            
            <div className="mt-6 text-center">
              <Link href="/standings" className="text-sm font-semibold text-red-500 dark:text-red-400 hover:underline">
                Voir le classement complet
              </Link>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}