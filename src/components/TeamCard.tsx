import React from 'react';
import { Users } from 'lucide-react';

interface TeamCardProps {
  teamNumber: number;
  members: string[];
}

const TeamCard = ({ teamNumber, members }: TeamCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-white mr-2" />
          <h3 className="text-lg font-semibold text-white">Team {teamNumber}</h3>
        </div>
        <p className="text-blue-100 text-sm">{members.length} members</p>
      </div>
      
      <ul className="p-4">
        {members.map((member, index) => (
          <li key={index} className="py-2 border-b last:border-b-0 border-gray-100">
            {member}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamCard;