import { Driver, Team, Race } from '../types';

export const fallbackTeams: Team[] = [
  { id: 'mercedes', name: 'Mercedes', full_name: 'Mercedes-AMG Petronas F1 Team', color: '#00A19C', secondary_color: '#000000', power_unit: 'Mercedes-AMG HPP', base: 'Brackley, UK', team_principal: 'Toto Wolff', points: 262, position: 1, wins: 6, podiums: 10, first_entry: 1954, championships: 8 },
  { id: 'ferrari', name: 'Ferrari', full_name: 'Scuderia Ferrari HP', color: '#DC0000', secondary_color: '#FFEB00', power_unit: 'Ferrari', base: 'Maranello, Italy', team_principal: 'Fred Vasseur', points: 190, position: 2, wins: 1, podiums: 8, first_entry: 1950, championships: 16 },
  { id: 'mclaren', name: 'McLaren', full_name: 'McLaren Mastercard F1 Team', color: '#FF8000', secondary_color: '#000000', power_unit: 'Mercedes', base: 'Woking, UK', team_principal: 'Andrea Stella', points: 141, position: 3, wins: 0, podiums: 5, first_entry: 1966, championships: 8 },
  { id: 'red-bull', name: 'Red Bull Racing', full_name: 'Oracle Red Bull Racing', color: '#1E41FF', secondary_color: '#DB0A40', power_unit: 'Red Bull-Ford', base: 'Milton Keynes, UK', team_principal: 'Christian Horner', points: 89, position: 4, wins: 0, podiums: 2, first_entry: 2005, championships: 6 },
  { id: 'alpine', name: 'Alpine', full_name: 'Alpine BWT F1 Team', color: '#FD4BC7', secondary_color: '#005BA9', power_unit: 'Mercedes', base: 'Enstone, UK', team_principal: 'Oliver Oakes', points: 57, position: 5, wins: 0, podiums: 1, first_entry: 1986, championships: 2 },
  { id: 'racing-bulls', name: 'Racing Bulls', full_name: 'Visa Cash App Racing Bulls', color: '#6692FF', secondary_color: '#FFFFFF', power_unit: 'Red Bull-Ford', base: 'Faenza, Italy', team_principal: 'Laurent Mekies', points: 41, position: 6, wins: 0, podiums: 0, first_entry: 1985, championships: 0 },
  { id: 'haas', name: 'Haas', full_name: 'TGR Haas F1 Team', color: '#B7B7B7', secondary_color: '#DC0A14', power_unit: 'Ferrari', base: 'Kannapolis, USA', team_principal: 'Ayao Komatsu', points: 21, position: 7, wins: 0, podiums: 0, first_entry: 2016, championships: 0 },
  { id: 'williams', name: 'Williams', full_name: 'Williams Racing', color: '#005AFF', secondary_color: '#FFFFFF', power_unit: 'Mercedes', base: 'Grove, UK', team_principal: 'James Vowles', points: 11, position: 8, wins: 0, podiums: 0, first_entry: 1977, championships: 9 },
  { id: 'audi', name: 'Audi', full_name: 'Audi Formula 1 Team', color: '#C0C0C0', secondary_color: '#E60012', power_unit: 'Audi', base: 'Hinwil, Switzerland', team_principal: 'Jonathan Wheatley', points: 2, position: 9, wins: 0, podiums: 0, first_entry: 2026, championships: 0 },
  { id: 'aston-martin', name: 'Aston Martin', full_name: 'Aston Martin Aramco F1 Team', color: '#006F62', secondary_color: '#CEDC00', power_unit: 'Honda', base: 'Silverstone, UK', team_principal: 'Andy Cowell', points: 1, position: 10, wins: 0, podiums: 0, first_entry: 2018, championships: 0 },
  { id: 'cadillac', name: 'Cadillac', full_name: 'Cadillac Formula 1 Team', color: '#1A1A1A', secondary_color: '#D7A65C', power_unit: 'Ferrari', base: 'Indianapolis, USA', team_principal: 'Graeme Lowdon', points: 0, position: 11, wins: 0, podiums: 0, first_entry: 2026, championships: 0 },
];

export const fallbackDrivers: Driver[] = [
  { id: 'kimi-antonelli', first_name: 'Kimi', last_name: 'Antonelli', code: 'ANT', number: 12, nationality: 'Italian', team_id: 'mercedes', points: 156, position: 1, teams: fallbackTeams[0] },
  { id: 'lewis-hamilton', first_name: 'Lewis', last_name: 'Hamilton', code: 'HAM', number: 44, nationality: 'British', team_id: 'ferrari', points: 115, position: 2, teams: fallbackTeams[1] },
  { id: 'george-russell', first_name: 'George', last_name: 'Russell', code: 'RUS', number: 63, nationality: 'British', team_id: 'mercedes', points: 106, position: 3, teams: fallbackTeams[0] },
  { id: 'charles-leclerc', first_name: 'Charles', last_name: 'Leclerc', code: 'LEC', number: 16, nationality: 'Monegasque', team_id: 'ferrari', points: 75, position: 4, teams: fallbackTeams[1] },
  { id: 'lando-norris', first_name: 'Lando', last_name: 'Norris', code: 'NOR', number: 1, nationality: 'British', team_id: 'mclaren', points: 73, position: 5, teams: fallbackTeams[2] },
  { id: 'oscar-piastri', first_name: 'Oscar', last_name: 'Piastri', code: 'PIA', number: 81, nationality: 'Australian', team_id: 'mclaren', points: 68, position: 6, teams: fallbackTeams[2] },
  { id: 'max-verstappen', first_name: 'Max', last_name: 'Verstappen', code: 'VER', number: 3, nationality: 'Dutch', team_id: 'red-bull', points: 55, position: 7, teams: fallbackTeams[3] },
  { id: 'pierre-gasly', first_name: 'Pierre', last_name: 'Gasly', code: 'GAS', number: 10, nationality: 'French', team_id: 'alpine', points: 41, position: 8, teams: fallbackTeams[4] },
  { id: 'isack-hadjar', first_name: 'Isack', last_name: 'Hadjar', code: 'HAD', number: 6, nationality: 'French', team_id: 'red-bull', points: 34, position: 9, teams: fallbackTeams[3] },
  { id: 'liam-lawson', first_name: 'Liam', last_name: 'Lawson', code: 'LAW', number: 30, nationality: 'New Zealander', team_id: 'racing-bulls', points: 28, position: 10, teams: fallbackTeams[5] },
  { id: 'oliver-bearman', first_name: 'Oliver', last_name: 'Bearman', code: 'BEA', number: 87, nationality: 'British', team_id: 'haas', points: 18, position: 11, teams: fallbackTeams[6] },
  { id: 'franco-colapinto', first_name: 'Franco', last_name: 'Colapinto', code: 'COL', number: 43, nationality: 'Argentine', team_id: 'alpine', points: 16, position: 12, teams: fallbackTeams[4] },
  { id: 'arvid-lindblad', first_name: 'Arvid', last_name: 'Lindblad', code: 'LIN', number: 41, nationality: 'British', team_id: 'racing-bulls', points: 13, position: 13, teams: fallbackTeams[5] },
  { id: 'carlos-sainz', first_name: 'Carlos', last_name: 'Sainz', code: 'SAI', number: 55, nationality: 'Spanish', team_id: 'williams', points: 6, position: 14, teams: fallbackTeams[7] },
  { id: 'alexander-albon', first_name: 'Alexander', last_name: 'Albon', code: 'ALB', number: 23, nationality: 'Thai', team_id: 'williams', points: 5, position: 15, teams: fallbackTeams[7] },
  { id: 'esteban-ocon', first_name: 'Esteban', last_name: 'Ocon', code: 'OCO', number: 31, nationality: 'French', team_id: 'haas', points: 3, position: 16, teams: fallbackTeams[6] },
  { id: 'gabriel-bortoleto', first_name: 'Gabriel', last_name: 'Bortoleto', code: 'BOR', number: 5, nationality: 'Brazilian', team_id: 'audi', points: 2, position: 17, teams: fallbackTeams[8] },
  { id: 'fernando-alonso', first_name: 'Fernando', last_name: 'Alonso', code: 'ALO', number: 14, nationality: 'Spanish', team_id: 'aston-martin', points: 1, position: 18, teams: fallbackTeams[9] },
  { id: 'nico-hulkenberg', first_name: 'Nico', last_name: 'Hulkenberg', code: 'HUL', number: 27, nationality: 'German', team_id: 'audi', points: 0, position: 19, teams: fallbackTeams[8] },
  { id: 'valtteri-bottas', first_name: 'Valtteri', last_name: 'Bottas', code: 'BOT', number: 77, nationality: 'Finnish', team_id: 'cadillac', points: 0, position: 20, teams: fallbackTeams[10] },
  { id: 'sergio-perez', first_name: 'Sergio', last_name: 'Perez', code: 'PER', number: 11, nationality: 'Mexican', team_id: 'cadillac', points: 0, position: 21, teams: fallbackTeams[10] },
  { id: 'lance-stroll', first_name: 'Lance', last_name: 'Stroll', code: 'STR', number: 18, nationality: 'Canadian', team_id: 'aston-martin', points: 0, position: 22, teams: fallbackTeams[9] },
];

export const fallbackRaces: Race[] = [
  { id: 'australia-2026', round: 1, name: 'Australian Grand Prix', circuit: 'Albert Park Circuit', country: 'Australia', country_code: 'AU', date_start: '2026-03-06T01:00:00+00:00', date_end: '2026-03-08T05:00:00+00:00', status: 'completed' },
  { id: 'china-2026', round: 2, name: 'Chinese Grand Prix', circuit: 'Shanghai International Circuit', country: 'China', country_code: 'CN', date_start: '2026-03-13T07:00:00+00:00', date_end: '2026-03-15T09:00:00+00:00', status: 'completed' },
  { id: 'japan-2026', round: 3, name: 'Japanese Grand Prix', circuit: 'Suzuka International Racing Course', country: 'Japan', country_code: 'JP', date_start: '2026-03-27T02:00:00+00:00', date_end: '2026-03-29T06:00:00+00:00', status: 'completed' },
  { id: 'miami-2026', round: 4, name: 'Miami Grand Prix', circuit: 'Miami International Autodrome', country: 'United States', country_code: 'US', date_start: '2026-05-01T20:00:00+00:00', date_end: '2026-05-03T22:00:00+00:00', status: 'completed' },
  { id: 'canada-2026', round: 5, name: 'Canadian Grand Prix', circuit: 'Circuit Gilles Villeneuve', country: 'Canada', country_code: 'CA', date_start: '2026-05-22T18:00:00+00:00', date_end: '2026-05-24T20:00:00+00:00', status: 'completed' },
  { id: 'monaco-2026', round: 6, name: 'Monaco Grand Prix', circuit: 'Circuit de Monaco', country: 'Monaco', country_code: 'MC', date_start: '2026-06-05T13:00:00+00:00', date_end: '2026-06-07T14:00:00+00:00', status: 'completed' },
  { id: 'spain-2026', round: 7, name: 'Spanish Grand Prix', circuit: 'Circuit de Barcelona-Catalunya', country: 'Spain', country_code: 'ES', date_start: '2026-06-12T11:30:00+00:00', date_end: '2026-06-14T14:00:00+00:00', status: 'completed' },
  { id: 'austria-2026', round: 8, name: 'Austrian Grand Prix', circuit: 'Red Bull Ring', country: 'Austria', country_code: 'AT', date_start: '2026-06-26T11:30:00+00:00', date_end: '2026-06-28T14:00:00+00:00', status: 'next' },
  { id: 'britain-2026', round: 9, name: 'British Grand Prix', circuit: 'Silverstone Circuit', country: 'United Kingdom', country_code: 'GB', date_start: '2026-07-03T12:00:00+00:00', date_end: '2026-07-05T15:00:00+00:00', status: 'upcoming' },
];
