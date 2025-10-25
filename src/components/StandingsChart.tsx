"use client";

import { Standing } from '@/lib/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StandingsChartProps {
  data: Standing[];
}

const StandingsChart = ({ data }: StandingsChartProps) => {
  const chartData = data.slice(0, 10).map(team => ({
    name: team.standing_team,
    G: parseInt(team.standing_W, 10), 
    P: parseInt(team.standing_L, 10), 
  }));

  return (
    <div className="rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl p-4 h-96 w-full">
      <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">Top 10 - Victoires vs Défaites</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={chartData} 
          margin={{ top: 5, right: 20, left: -10, bottom: 40 }} 
        >
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            interval={0} 
            tick={{ fontSize: 10, fill: 'currentColor' }} 
            className="text-neutral-900 dark:text-gray-400"
          />
          <YAxis 
            tick={{ fontSize: 12, fill: 'currentColor' }}
            className="text-neutral-900 dark:text-gray-400"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(30, 30, 30, 0.8)', 
              borderColor: '#555' 
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend 
            verticalAlign="top" 
            wrapperStyle={{ color: 'currentColor' }}
            iconType="circle"
          />
          <Bar dataKey="G" fill="#22c55e" name="Victoires" />
          <Bar dataKey="P" fill="#ef4444" name="Défaites" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StandingsChart;
