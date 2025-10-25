"use client";

import { Standing } from "@/lib/api";

interface ExportButtonProps {
  data: Standing[];
  filename: string;
}

const ExportButton = ({ data, filename }: ExportButtonProps) => {
  const convertToCSV = (dataToConvert: Standing[]) => {
    const headers = ["Place", "Équipe", "Joués", "Gagnés", "Perdus"];
    const rows = dataToConvert.map((team) =>
      [
        team.standing_place,
        `"${team.standing_team}"`,
        team.standing_P,
        team.standing_W,
        team.standing_L,
      ].join(",")
    );

    return [headers.join(","), ...rows].join("\n");
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(data);

    
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    
    const link = document.createElement("a");
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }

    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", filename);

    
    document.body.appendChild(link);
    link.click();

    
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={downloadCSV}
      className="px-4 py-2 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-gray-200 dark:border-neutral-700 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
    >
      Exporter en CSV
    </button>
  );
};

export default ExportButton;
