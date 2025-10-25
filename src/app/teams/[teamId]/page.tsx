import { getTeamDetails } from '@/lib/api';
// Importe le nouveau composant client
import TeamDetailsDisplay from '@/components/TeamDetailsDisplay'; 

interface TeamDetailPageProps {
  params: {
    teamId: string;
  };
}

// La page reste un Server Component pour fetcher les données
export default async function TeamDetailPage({ params: { teamId } }: TeamDetailPageProps) {
  
  // 1. Récupérer les données
  const teamDetails = await getTeamDetails(teamId);

  // 2. Rendre le composant client en lui passant les données
  return <TeamDetailsDisplay teamDetails={teamDetails} />;
}

