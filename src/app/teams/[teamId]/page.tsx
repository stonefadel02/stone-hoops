import TeamDetailsDisplay from '@/components/TeamDetailsDisplay'; // Le composant client qui affiche
import { getTeamDetails, getTeams, Team } from '@/lib/api'; // Ajout de getTeams et Team
import { Metadata, ResolvingMetadata } from 'next'; // Pour le titre dynamique

// Type des props standard
type Props = {
  params: { teamId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Fonction pour générer les métadonnées (Titre de la page)
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const teamId = params.teamId;
  // NOTE: On appelle getTeamDetails ici aussi. Idéalement, mettre en cache ou passer les données.
  const teamDetails = await getTeamDetails(teamId); // Utilise l'ancienne API
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: teamDetails ? `${teamDetails.team_name} | Stone Hoops` : 'Équipe | Stone Hoops',
     // Vous pouvez aussi ajouter une image OpenGraph (pour réseaux sociaux)
    // openGraph: {
    //   images: [teamDetails?.team_logo || '/images/stone.png', ...previousImages],
    // },
  }
}


// Page Server Component
export default async function TeamDetailPage({ params }: Props) {
  const { teamId } = params;

  // Récupérer les détails de l'équipe ET une liste d'autres équipes pour la sidebar
  // NOTE: Il faudrait une logique plus intelligente pour choisir les équipes de la sidebar
  // Ici, on prend juste toutes les équipes de la ligue pour l'exemple.
  const [teamDetails, allTeams] = await Promise.all([
     getTeamDetails(teamId), // Utilise l'ancienne API
     getTeams("757") // Utilise l'ancienne API (votre LEAGUE_ID)
  ]);

  // Exclure l'équipe actuelle et prendre 2 autres au hasard (exemple simple)
  const sidebarTeams = allTeams
      .filter(team => team.team_key !== teamId)
      .sort(() => 0.5 - Math.random()) // Mélange aléatoire
      .slice(0, 2); // Prend les 2 premières

  // Passe les détails ET les équipes de la sidebar au composant client
  return <TeamDetailsDisplay teamDetails={teamDetails} sidebarTeams={sidebarTeams} />;
}