import { Team } from '@/lib/api'; 
import Image from 'next/image';
import Link from 'next/link';

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <Link 
      href={`/teams/${team.team_key}`} 
      className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-neutral-900 
                 border border-transparent dark:border-neutral-800 rounded-lg 
                 shadow-lg hover:shadow-xl dark:hover:border-neutral-700 
                 transition-all duration-300 transform hover:-translate-y-1"
    >
      
      <div className="relative h-24 w-24">
        {team.team_logo ? (
          <Image 
            src={team.team_logo} 
            alt={`Logo de ${team.team_name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain rounded-md "
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-neutral-800 rounded-full flex items-center justify-center text-gray-500 text-2xl font-bold">
            {team.team_name.charAt(0)}
          </div>
        )}
      </div>

      
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-500 transition-colors">
          {team.team_name}
        </h2>
      
      </div>
    </Link>
  );
};

export default TeamCard;