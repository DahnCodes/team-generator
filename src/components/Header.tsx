import React from 'react';
import { Users } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <Users className="h-6 w-6 text-blue-600 mr-2" />
        <h1 className="text-xl font-semibold text-gray-800">Team Generator</h1>
      </div>
    </header>
  );
};

export default Header;