// src/app/teams/[teamId]/page.tsx
import TeamDetailsDisplay from '@/components/TeamDetailsDisplay';
import { getTeamDetails, getTeams } from '@/lib/api';
import { Metadata } from 'next';

// Fonction pour générer les métadonnées (Titre de la page)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ teamId: string }>;
}): Promise<Metadata> {
  const { teamId } = await params; // ✅ Attendre les params
  const teamDetails = await getTeamDetails(teamId);

  return {
    title: teamDetails
      ? `${teamDetails.team_name} | Stone Hoops`
      : 'Équipe | Stone Hoops',
  };
}

// Page Server Component
export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params; // ✅ Attendre les params

  // Récupérer les détails de l'équipe ET une liste d'autres équipes pour la sidebar
  const [teamDetails, allTeams] = await Promise.all([
    getTeamDetails(teamId),
    getTeams("757"), // Utilise votre LEAGUE_ID
  ]);

  // Exclure l'équipe actuelle et prendre 2 autres au hasard
  const sidebarTeams = allTeams
    .filter((team) => team.team_key !== teamId)
    .sort(() => 0.5 - Math.random()) // Mélange aléatoire
    .slice(0, 2); // Prend les 2 premières

  // Passe les détails ET les équipes de la sidebar au composant client
  return (
    <TeamDetailsDisplay teamDetails={teamDetails} sidebarTeams={sidebarTeams} />
  );
}