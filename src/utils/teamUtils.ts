/**
 * Shuffle an array using the Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generate teams from a list of names
 * @param names Array of names to distribute into teams
 * @param teamSize Number of people per team
 * @returns Array of teams (each team is an array of names)
 */
export const generateTeams = (names: string[], teamSize: number): string[][] => {
  // Shuffle the names to ensure random distribution
  const shuffledNames = shuffleArray(names);
  const teams: string[][] = [];
  
  // If teamSize is greater than the number of people, just create one team
  if (teamSize >= shuffledNames.length) {
    teams.push(shuffledNames);
    return teams;
  }
  
  // Calculate how many teams we need
  const numTeams = Math.ceil(shuffledNames.length / teamSize);
  
  // Initialize empty teams
  for (let i = 0; i < numTeams; i++) {
    teams.push([]);
  }
  
  // Distribute names into teams
  // This approach ensures more even distribution than slicing the array
  shuffledNames.forEach((name, index) => {
    const teamIndex = index % numTeams;
    teams[teamIndex].push(name);
  });
  
  return teams;
};