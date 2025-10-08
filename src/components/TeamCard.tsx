import { Team } from '@/lib/api'; 
import Image from 'next/image';

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg flex flex-col items-center text-center bg-white dark:bg-gray-800">
      {team.team_logo ? (
        <Image 
          src={team.team_logo} 
          alt={`Logo de ${team.team_name}`}
          width={80}
          height={80}
          className="mb-4"
        />
      ) : (
        <div className="w-20 h-20 mb-4 bg-gray-200 rounded-full flex items-center justify-center">
          ?
        </div>
      )}
      <h2 className="text-lg font-semibold">{team.team_name}</h2>
    </div>
  );
};

export default TeamCard;