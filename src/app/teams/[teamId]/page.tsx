import TeamDetailsDisplay from '@/components/TeamDetailsDisplay';
import { getTeamDetails } from '@/lib/api';

type Props = {
  params: Promise<{ teamId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TeamDetailPage({ params }: Props) {
  const { teamId } = await params; 
  const teamDetails = await getTeamDetails(teamId);
  
  return <TeamDetailsDisplay teamDetails={teamDetails} />;
}