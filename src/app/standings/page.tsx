import { getStandings } from '@/lib/api';
import StandingsTable from '@/components/StandingsTable';
import StandingsChart from '@/components/StandingsChart'; // <-- 1. Importer le graphique
import ExportButton from '@/components/ExportButton'; // <-- 2. Importer le bouton

const LEAGUE_ID = "757"; // ou 756

export default async function StandingsPage() {
  const standings = await getStandings(LEAGUE_ID);

  return (
    <div className="mt-28">
      {/* Titre stylisé */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-widest text-neutral-900 dark:text-white" 
            style={{ WebkitTextStroke: '1px rgba(100,100,100,0.3)' }}>
          Classement
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Classement officiel de la ligue</p>
      </div>
      
      {standings.length > 0 ? (
        <div className="space-y-8">
          {/* 3. Ajouter le bouton d'export */}
          <div className="flex justify-end">
            <ExportButton 
              data={standings} 
              filename={`classement-${LEAGUE_ID}.csv`} 
            />
          </div>

          {/* 4. Ajouter le graphique */}
          <StandingsChart data={standings} />

          {/* 5. Garder le tableau */}
          <StandingsTable standings={standings} />
        </div>
      ) : (
        <p className="rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 text-center text-gray-700 dark:text-gray-400">
          Le classement n'est pas disponible pour le moment.
        </p>
      )}
    </div>
  );
}

