export interface Team {
  id: string;
  name: string;
  full_name: string;
  color: string;
  secondary_color: string;
  power_unit: string;
  base: string;
  team_principal: string;
  points: number;
  position: number;
  wins: number;
  podiums: number;
  first_entry: number;
  championships: number;
}

export interface Driver {
  id: string;
  first_name: string;
  last_name: string;
  code: string;
  number: number;
  nationality: string;
  team_id: string;
  points: number;
  position: number;
  image_url?: string;
  teams?: Team | null;
}

export interface Race {
  id: string;
  round: number;
  name: string;
  circuit: string;
  country: string;
  country_code: string;
  date_start: string;
  date_end: string;
  winner_id?: string;
  status: 'completed' | 'upcoming' | 'next';
  winner?: Driver | null;
}

export interface Result {
  id: string;
  race_id: string;
  driver_id: string;
  position: number;
  points: number;
  drivers?: Driver;
  races?: Race;
}

export interface CircuitInfo {
  id: string;
  name: string;
  location: string;
  country: string;
  length: string;
  laps: number;
  lap_record: string;
  lap_record_driver: string;
  first_gp: number;
  type: 'Street' | 'Permanent' | 'Hybrid';
  elevation: string;
  corners: number;
  drs_zones: number;
  description: string;
}

export interface Regulation {
  id: string;
  title: string;
  category: 'Power Unit' | 'Aerodynamics' | 'Chassis' | 'Sustainability' | 'Sporting';
  description: string;
  impact: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}
