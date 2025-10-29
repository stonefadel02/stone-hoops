// src/components/StandingsChart.tsx
"use client";

import { Standing } from '@/lib/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes'; // Pour lire le thème

const StandingsChart = ({ data }: { data: Standing[] }) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  
  // Couleurs de texte pour les axes
  const tickColor = currentTheme === 'dark' ? '#9ca3af' : '#6b7280'; // Gris

  // Données pour le graphique (Top 10)
  const chartData = data.slice(0, 10).map(team => ({
    name: team.standing_team.substring(0, 10) + '...', // Noms raccourcis
    G: parseInt(team.standing_W, 10), // Victoires
    P: parseInt(team.standing_L, 10), // Défaites
  }));

  return (
    // Carte sombre/claire
    <div className="rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-xl p-4 pt-6 h-96 w-full">
      <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white text-center">
        Top 10 - Victoires vs Défaites
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={chartData} 
          margin={{ top: 5, right: 0, left: -20, bottom: 40 }} // Marge ajustée
        >
          <XAxis 
            dataKey="name" 
            angle={-35} // Noms en diagonale
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 10, fill: tickColor }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: tickColor }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: currentTheme === 'dark' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)', 
              borderColor: currentTheme === 'dark' ? '#555' : '#ccc',
              borderRadius: '8px',
            }}
            labelStyle={{ color: currentTheme === 'dark' ? '#fff' : '#333' }}
            itemStyle={{ fontWeight: 'bold' }}
          />
          <Legend 
            verticalAlign="top" 
            wrapperStyle={{ color: tickColor, paddingBottom: '10px' }}
            iconType="circle"
          />
          <Bar dataKey="G" fill="#22c55e" name="Victoires" radius={[4, 4, 0, 0]} />
          <Bar dataKey="P" fill="#ef4444" name="Défaites" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StandingsChart;