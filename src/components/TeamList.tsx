import React from 'react';
import TeamCard from './TeamCard';

interface TeamListProps {
  teams: string[][];
}

const TeamList = ({ teams }: TeamListProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Teams</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team, index) => (
          <TeamCard key={index} teamNumber={index + 1} members={team} />
        ))}
      </div>
    </div>
  );
};

export default TeamList;