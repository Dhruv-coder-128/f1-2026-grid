export const driverImageUrls: Record<string, string> = {
  'lando-norris': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/norris',
  'oscar-piastri': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/piastri',
  'max-verstappen': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/verstappen',
  'isack-hadjar': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/hadjar',
  'george-russell': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/russell',
  'kimi-antonelli': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/antonelli',
  'charles-leclerc': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/leclerc',
  'lewis-hamilton': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/hamilton',
  'alexander-albon': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/albon',
  'carlos-sainz': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/sainz',
  'fernando-alonso': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/alonso',
  'lance-stroll': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/stroll',
  'esteban-ocon': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/ocon',
  'oliver-bearman': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/bearman',
  'nico-hulkenberg': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/hulkenberg',
  'gabriel-bortoleto': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/bortoleto',
  'pierre-gasly': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/gasly',
  'franco-colapinto': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/colapinto',
  'liam-lawson': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/lawson',
  'arvid-lindblad': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/lindblad',
  'valtteri-bottas': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/bottas',
  'sergio-perez': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2026Drivers/perez',
};

export function getDriverImageUrl(driverId: string): string {
  return driverImageUrls[driverId] || `https://ui-avatars.com/api/?name=${encodeURIComponent(driverId.replace('-', ' '))}&background=e10600&color=fff&size=256&font-size=0.4&bold=true`;
}

export function getTeamImageUrl(teamId: string): string {
  const teamUrls: Record<string, string> = {
    'mercedes': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2026/mercedes',
    'ferrari': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2026/ferrari',
    'red-bull': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2026/red-bull-racing',
    'mclaren': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2026/mclaren',
    'aston-martin': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2026/aston-martin',
    'alpine': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2026/alpine',
    'williams': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2026/williams',
    'racing-bulls': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2026/racing-bulls',
    'haas': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2026/haas',
    'audi': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2026/audi',
    'cadillac': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/teams/2026/cadillac',
  };
  return teamUrls[teamId] || '';
}
