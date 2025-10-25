"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTeams, Team } from '@/lib/api'; // On utilise la fonction et le type existants

const LEAGUE_ID = "757"; // Gardez l'ID de ligue que vous utilisez

const SearchBar = () => {
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [query, setQuery] = useState('');
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Récupérer toutes les équipes au chargement du composant
  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const teams = await getTeams(LEAGUE_ID);
        setAllTeams(teams);
      } catch (err) {
        console.error("Erreur lors de la récupération des équipes pour la recherche:", err);
        setError("Impossible de charger les équipes.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeams();
  }, []);

  // 2. Filtrer les équipes quand la requête change
  useEffect(() => {
    if (query.length > 1) { // On commence à chercher après 1 caractère
      const lowerCaseQuery = query.toLowerCase();
      setFilteredTeams(
        allTeams.filter(team => 
          team.team_name.toLowerCase().includes(lowerCaseQuery)
        )
      );
    } else {
      setFilteredTeams([]); // Vide les résultats si la requête est trop courte
    }
  }, [query, allTeams]);

  return (
    <div className="relative w-full max-w-xs md:max-w-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher une équipe..."
        className="w-full px-4 py-2 rounded-full bg-gray-200 dark:bg-neutral-800 text-neutral-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BD343B] dark:focus:ring-[#FF4C54]"
      />
      {/* Affichage des résultats */}
      {query.length > 1 && (
        <div className="absolute z-10 top-full mt-2 w-full bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-gray-200 dark:border-neutral-700 max-h-60 overflow-y-auto">
          {isLoading && <div className="p-4 text-center text-gray-500">Chargement...</div>}
          {error && <div className="p-4 text-center text-red-500">{error}</div>}
          {!isLoading && !error && filteredTeams.length > 0 && (
            <ul>
              {filteredTeams.map(team => (
                <li key={team.team_key}>
                  <Link 
                    href={`/teams/${team.team_key}`} 
                    className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-gray-200 transition-colors"
                    onClick={() => setQuery('')} // Optionnel: vide la recherche après clic
                  >
                    {team.team_name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!isLoading && !error && filteredTeams.length === 0 && query.length > 1 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">Aucune équipe trouvée.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
