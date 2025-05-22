import React from 'react';
import Header from './components/Header';
import TeamGenerator from './components/TeamGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TeamGenerator />
      </main>
    </div>
  );
}

export default App;