import { Driver } from '../types';
import { fallbackDrivers } from './fallbackData';

interface WeatherData {
  temp: number;
  conditions: string;
  rainChance: number;
}

interface PreviousWinner {
  year: number;
  driver: string;
  team: string;
}

interface RaceResult {
  position: number;
  driverId: string;
  points: number;
}

// Helper to get track map path from slug
const getTrackMapPath = (slug: string): string => {
  return `/trackmaps/${slug}.avif`;
};

export interface RaceDetail {
  slug: string;
  circuitName: string;
  country: string;
  length: string;
  turns: number;
  laps: number;
  raceDistance: string;
  firstGrandPrix: number;
  lapRecord: string;
  recordHolder: string;
  heroImage: string;
  trackMap: string;
  weather: WeatherData;
  previousWinners: PreviousWinner[];
  results?: RaceResult[];
  schedule: {
    day: string;
    sessions: string[];
  }[];
}

export const raceDetails: Record<string, RaceDetail> = {
  'australian-grand-prix': {
    slug: 'australian-grand-prix',
    circuitName: 'Albert Park Circuit',
    country: 'Australia',
    length: '5.303 km',
    turns: 16,
    laps: 58,
    raceDistance: '307.574 km',
    firstGrandPrix: 1985,
    lapRecord: '1:20.235',
    recordHolder: 'Charles Leclerc',
    heroImage: '/circuits/albert-park.jpg',
    trackMap: getTrackMapPath('australian-grand-prix'),
    weather: { temp: 24, conditions: 'Partly Cloudy', rainChance: 15 },
    previousWinners: [
      { year: 2025, driver: 'Lando Norris', team: 'McLaren' },
      { year: 2024, driver: 'Max Verstappen', team: 'Red Bull' },
      { year: 2023, driver: 'Max Verstappen', team: 'Red Bull' }
    ],
    results: [
      { position: 1, driverId: 'kimi-antonelli', points: 25 },
      { position: 2, driverId: 'lewis-hamilton', points: 18 },
      { position: 3, driverId: 'george-russell', points: 15 }
    ],
    schedule: [
      { day: 'Friday', sessions: ['FP1', 'FP2'] },
      { day: 'Saturday', sessions: ['FP3', 'Qualifying'] },
      { day: 'Sunday', sessions: ['Race'] }
    ]
  },
  'chinese-grand-prix': {
    slug: 'chinese-grand-prix',
    circuitName: 'Shanghai International Circuit',
    country: 'China',
    length: '5.451 km',
    turns: 16,
    laps: 56,
    raceDistance: '305.066 km',
    firstGrandPrix: 2004,
    lapRecord: '1:31.095',
    recordHolder: 'Max Verstappen',
    heroImage: '/circuits/shanghai.jpg',
    trackMap: getTrackMapPath('chinese-grand-prix'),
    weather: { temp: 18, conditions: 'Overcast', rainChance: 40 },
    previousWinners: [
      { year: 2025, driver: 'Charles Leclerc', team: 'Ferrari' },
      { year: 2019, driver: 'Lewis Hamilton', team: 'Mercedes' },
      { year: 2018, driver: 'Daniel Ricciardo', team: 'Red Bull' }
    ],
    results: [
      { position: 1, driverId: 'charles-leclerc', points: 25 },
      { position: 2, driverId: 'kimi-antonelli', points: 18 },
      { position: 3, driverId: 'lando-norris', points: 15 }
    ],
    schedule: [
      { day: 'Friday', sessions: ['FP1', 'Sprint Qualifying'] },
      { day: 'Saturday', sessions: ['Sprint Race', 'Qualifying'] },
      { day: 'Sunday', sessions: ['Race'] }
    ]
  },
  'japanese-grand-prix': {
    slug: 'japanese-grand-prix',
    circuitName: 'Suzuka International Racing Course',
    country: 'Japan',
    length: '5.807 km',
    turns: 18,
    laps: 53,
    raceDistance: '307.471 km',
    firstGrandPrix: 1976,
    lapRecord: '1:28.243',
    recordHolder: 'Lewis Hamilton',
    heroImage: '/circuits/suzuka.jpg',
    trackMap: getTrackMapPath('japanese-grand-prix'),
    weather: { temp: 21, conditions: 'Sunny', rainChance: 5 },
    previousWinners: [
      { year: 2025, driver: 'Max Verstappen', team: 'Red Bull' },
      { year: 2024, driver: 'Max Verstappen', team: 'Red Bull' },
      { year: 2023, driver: 'Max Verstappen', team: 'Red Bull' }
    ],
    results: [
      { position: 1, driverId: 'max-verstappen', points: 25 },
      { position: 2, driverId: 'oscar-piastri', points: 18 },
      { position: 3, driverId: 'charles-leclerc', points: 15 }
    ],
    schedule: [
      { day: 'Friday', sessions: ['FP1', 'FP2'] },
      { day: 'Saturday', sessions: ['FP3', 'Qualifying'] },
      { day: 'Sunday', sessions: ['Race'] }
    ]
  },
  'miami-grand-prix': {
    slug: 'miami-grand-prix',
    circuitName: 'Miami International Autodrome',
    country: 'United States',
    length: '5.412 km',
    turns: 19,
    laps: 57,
    raceDistance: '308.326 km',
    firstGrandPrix: 2022,
    lapRecord: '1:28.756',
    recordHolder: 'Max Verstappen',
    heroImage: '/circuits/miami.jpg',
    trackMap: getTrackMapPath('miami-grand-prix'),
    weather: { temp: 29, conditions: 'Hot and Humid', rainChance: 25 },
    previousWinners: [
      { year: 2025, driver: 'George Russell', team: 'Mercedes' },
      { year: 2024, driver: 'Lando Norris', team: 'McLaren' },
      { year: 2023, driver: 'Max Verstappen', team: 'Red Bull' }
    ],
    results: [
      { position: 1, driverId: 'george-russell', points: 25 },
      { position: 2, driverId: 'lando-norris', points: 18 },
      { position: 3, driverId: 'pierre-gasly', points: 15 }
    ],
    schedule: [
      { day: 'Friday', sessions: ['FP1', 'FP2'] },
      { day: 'Saturday', sessions: ['FP3', 'Qualifying'] },
      { day: 'Sunday', sessions: ['Race'] }
    ]
  },
  'canadian-grand-prix': {
    slug: 'canadian-grand-prix',
    circuitName: 'Circuit Gilles Villeneuve',
    country: 'Canada',
    length: '4.361 km',
    turns: 14,
    laps: 70,
    raceDistance: '305.270 km',
    firstGrandPrix: 1967,
    lapRecord: '1:13.078',
    recordHolder: 'Valtteri Bottas',
    heroImage: '/circuits/canada.jpg',
    trackMap: getTrackMapPath('canadian-grand-prix'),
    weather: { temp: 17, conditions: 'Cool', rainChance: 60 },
    previousWinners: [
      { year: 2025, driver: 'Oscar Piastri', team: 'McLaren' },
      { year: 2024, driver: 'Max Verstappen', team: 'Red Bull' },
      { year: 2023, driver: 'Max Verstappen', team: 'Red Bull' }
    ],
    results: [
      { position: 1, driverId: 'oscar-piastri', points: 25 },
      { position: 2, driverId: 'lewis-hamilton', points: 18 },
      { position: 3, driverId: 'fernando-alonso', points: 15 }
    ],
    schedule: [
      { day: 'Friday', sessions: ['FP1', 'Sprint Qualifying'] },
      { day: 'Saturday', sessions: ['Sprint Race', 'Qualifying'] },
      { day: 'Sunday', sessions: ['Race'] }
    ]
  },
  'monaco-grand-prix': {
    slug: 'monaco-grand-prix',
    circuitName: 'Circuit de Monaco',
    country: 'Monaco',
    length: '3.337 km',
    turns: 19,
    laps: 78,
    raceDistance: '260.286 km',
    firstGrandPrix: 1929,
    lapRecord: '1:12.909',
    recordHolder: 'Lewis Hamilton',
    heroImage: '/circuits/monaco.jpg',
    trackMap: getTrackMapPath('monaco-grand-prix'),
    weather: { temp: 22, conditions: 'Sunny', rainChance: 10 },
    previousWinners: [
      { year: 2025, driver: 'Charles Leclerc', team: 'Ferrari' },
      { year: 2024, driver: 'Charles Leclerc', team: 'Ferrari' },
      { year: 2023, driver: 'Max Verstappen', team: 'Red Bull' }
    ],
    results: [
      { position: 1, driverId: 'charles-leclerc', points: 25 },
      { position: 2, driverId: 'kimi-antonelli', points: 18 },
      { position: 3, driverId: 'george-russell', points: 15 }
    ],
    schedule: [
      { day: 'Friday', sessions: ['FP1', 'FP2'] },
      { day: 'Saturday', sessions: ['FP3', 'Qualifying'] },
      { day: 'Sunday', sessions: ['Race'] }
    ]
  },
  'spanish-grand-prix': {
    slug: 'spanish-grand-prix',
    circuitName: 'Circuit de Barcelona-Catalunya',
    country: 'Spain',
    length: '4.657 km',
    turns: 16,
    laps: 66,
    raceDistance: '307.104 km',
    firstGrandPrix: 1951,
    lapRecord: '1:13.017',
    recordHolder: 'Max Verstappen',
    heroImage: '/circuits/barcelona.jpg',
    trackMap: getTrackMapPath('spanish-grand-prix'),
    weather: { temp: 25, conditions: 'Clear', rainChance: 0 },
    previousWinners: [
      { year: 2025, driver: 'Lewis Hamilton', team: 'Ferrari' },
      { year: 2024, driver: 'Max Verstappen', team: 'Red Bull' },
      { year: 2023, driver: 'Max Verstappen', team: 'Red Bull' }
    ],
    results: [
      { position: 1, driverId: 'lewis-hamilton', points: 25 },
      { position: 2, driverId: 'kimi-antonelli', points: 18 },
      { position: 3, driverId: 'charles-leclerc', points: 15 }
    ],
    schedule: [
      { day: 'Friday', sessions: ['FP1', 'FP2'] },
      { day: 'Saturday', sessions: ['FP3', 'Qualifying'] },
      { day: 'Sunday', sessions: ['Race'] }
    ]
  },
  'austrian-grand-prix': {
    slug: 'austrian-grand-prix',
    circuitName: 'Red Bull Ring',
    country: 'Austria',
    length: '4.318 km',
    turns: 10,
    laps: 71,
    raceDistance: '306.452 km',
    firstGrandPrix: 1963,
    lapRecord: '1:05.619',
    recordHolder: 'Charles Leclerc',
    heroImage: '/circuits/red-bull-ring.jpg',
    trackMap: getTrackMapPath('austrian-grand-prix'),
    weather: { temp: 20, conditions: 'Partly Cloudy', rainChance: 30 },
    previousWinners: [
      { year: 2025, driver: 'Max Verstappen', team: 'Red Bull' },
      { year: 2024, driver: 'George Russell', team: 'Mercedes' },
      { year: 2023, driver: 'Max Verstappen', team: 'Red Bull' }
    ],
    schedule: [
      { day: 'Friday', sessions: ['FP1', 'Sprint Qualifying'] },
      { day: 'Saturday', sessions: ['Sprint Race', 'Qualifying'] },
      { day: 'Sunday', sessions: ['Race'] }
    ]
  },
  'british-grand-prix': {
    slug: 'british-grand-prix',
    circuitName: 'Silverstone Circuit',
    country: 'United Kingdom',
    length: '5.891 km',
    turns: 18,
    laps: 52,
    raceDistance: '306.198 km',
    firstGrandPrix: 1948,
    lapRecord: '1:27.097',
    recordHolder: 'Max Verstappen',
    heroImage: '/circuits/silverstone.jpg',
    trackMap: getTrackMapPath('british-grand-prix'),
    weather: { temp: 19, conditions: 'Windy', rainChance: 35 },
    previousWinners: [
      { year: 2025, driver: 'Lando Norris', team: 'McLaren' },
      { year: 2024, driver: 'Lewis Hamilton', team: 'Mercedes' },
      { year: 2023, driver: 'Max Verstappen', team: 'Red Bull' }
    ],
    schedule: [
      { day: 'Friday', sessions: ['FP1', 'FP2'] },
      { day: 'Saturday', sessions: ['FP3', 'Qualifying'] },
      { day: 'Sunday', sessions: ['Race'] }
    ]
  }
};

export function getDriverById(id: string): Driver | undefined {
  return fallbackDrivers.find(d => d.id === id);
}
