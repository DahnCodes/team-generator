import React, { useRef } from 'react';
import { Download, FileImage } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import TeamCard from './TeamCard';

interface TeamListProps {
  teams: string[][];
}

const TeamList = ({ teams }: TeamListProps) => {
  const teamsRef = useRef<HTMLDivElement>(null);

  const downloadAsPDF = async () => {
    if (!teamsRef.current) return;

    const canvas = await html2canvas(teamsRef.current, {
      scale: 2,
      backgroundColor: '#f9fafb',
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      0,
      canvas.width,
      canvas.height
    );

    pdf.save('teams.pdf');
  };

  const downloadAsImage = async () => {
    if (!teamsRef.current) return;

    const canvas = await html2canvas(teamsRef.current, {
      scale: 2,
      backgroundColor: '#f9fafb',
    });

    const link = document.createElement('a');
    link.download = 'teams.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Generated Teams</h2>
        <div className="flex gap-2">
          <button
            onClick={downloadAsPDF}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center text-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </button>
          <button
            onClick={downloadAsImage}
            className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all flex items-center text-sm"
          >
            <FileImage className="h-4 w-4 mr-2" />
            Image
          </button>
        </div>
      </div>
      
      <div ref={teamsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg">
        {teams.map((team, index) => (
          <TeamCard key={index} teamNumber={index + 1} members={team} />
        ))}
      </div>
    </div>
  );
};

export default TeamList;