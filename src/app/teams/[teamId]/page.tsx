import TeamDetailsDisplay from "@/components/TeamDetailsDisplay";
import { getTeamDetails } from "@/lib/api";

export default async function TeamDetailPage({
  params,
}: {
  params: { teamId: string };
}) {
  const { teamId } = params;
  const teamDetails = await getTeamDetails(teamId);

  return <TeamDetailsDisplay teamDetails={teamDetails} />;
}
