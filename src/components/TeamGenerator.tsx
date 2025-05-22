import React, { useState } from 'react';
import { Shuffle, Copy, Trash2 } from 'lucide-react';
import { generateTeams } from '../utils/teamUtils';
import TeamList from './TeamList';

const TeamGenerator = () => {
  const [names, setNames] = useState<string>('');
  const [teamSize, setTeamSize] = useState<number>(2);
  const [teams, setTeams] = useState<string[][]>([]);
  const [nameCount, setNameCount] = useState<number>(0);

  const handleNamesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNames(e.target.value);
    const namesList = e.target.value
      .split('\n')
      .map(name => name.trim())
      .filter(name => name !== '');
    setNameCount(namesList.length);
  };

  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value, 10);
    if (size > 0) {
      setTeamSize(size);
    }
  };

  const handleGenerateTeams = () => {
    const namesList = names
      .split('\n')
      .map(name => name.trim())
      .filter(name => name !== '');
    
    if (namesList.length > 0) {
      const generatedTeams = generateTeams(namesList, teamSize);
      setTeams(generatedTeams);
    }
  };

  const handleClear = () => {
    setNames('');
    setTeams([]);
    setNameCount(0);
  };

  const copyToClipboard = () => {
    if (teams.length === 0) return;
    
    const teamsText = teams
      .map((team, index) => `Team ${index + 1}: ${team.join(', ')}`)
      .join('\n');
    
    navigator.clipboard.writeText(teamsText).then(
      () => {
        alert('Teams copied to clipboard!');
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Names</h2>
        
        <div className="mb-6">
          <label htmlFor="names" className="block text-sm font-medium text-gray-700 mb-1">
            Participant Names
          </label>
          <p className="text-sm text-gray-500 mb-2">Enter one name per line</p>
          <textarea
            id="names"
            rows={8}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="John Smith
Jane Doe
Mike Johnson
..."
            value={names}
            onChange={handleNamesChange}
          />
          <p className="text-sm text-gray-500 mt-1">
            {nameCount} {nameCount === 1 ? 'name' : 'names'} entered
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">
            People Per Team
          </label>
          <input
            type="number"
            id="teamSize"
            min="1"
            value={teamSize}
            onChange={handleTeamSizeChange}
            className="w-24 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleGenerateTeams}
            disabled={nameCount === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Generate Teams
          </button>
          
          <button
            onClick={handleClear}
            disabled={names === '' && teams.length === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </button>
          
          {teams.length > 0 && (
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all flex items-center"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Teams
            </button>
          )}
        </div>
      </div>
      
      {teams.length > 0 && <TeamList teams={teams} />}
    </div>
  );
};

export default TeamGenerator;