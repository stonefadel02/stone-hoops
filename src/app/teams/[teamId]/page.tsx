import { getTeamDetails } from '@/lib/api';

import TeamDetailsDisplay from '@/components/TeamDetailsDisplay'; 

interface TeamDetailPageProps {
  params: {
    teamId: string;
  };
}


export default async function TeamDetailPage({ params: { teamId } }: TeamDetailPageProps) {
  
  
  const teamDetails = await getTeamDetails(teamId);

  
  return <TeamDetailsDisplay teamDetails={teamDetails} />;
}

