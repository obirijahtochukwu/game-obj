// Status Interface
export interface GameStatus {
  long: string;
  short: string;
  timer: null;
}

// League Interface
export interface League {
  id: number;
  name: string;
  type: string;
  season: string;
  logo: string;
}

// Country Interface
export interface Country {
  id: number;
  name: string;
  code: string;
  flag: string;
}

// Team Interface
export interface Team {
  id: number;
  name: string;
  logo: string;
}

// Teams Interface
export interface Teams {
  home: Team;
  away: Team;
}

// Score Interface
export interface Score {
  quarter_1: number;
  quarter_2: number;
  quarter_3: number;
  quarter_4: number;
  over_time: null;
  total: number;
}

// Scores Interface
export interface Scores {
  home: Score;
  away: Score;
}

// Odd Interface
export interface Odd {
  value: string;
  odd: string;
}

// Main GameData Interface
export interface GameData {
  id: number;
  date: string;
  time: string;
  timestamp: number;
  timezone: string;
  stage: null | string;
  week: null | string;
  venue: string;
  status: GameStatus;
  league: League;
  country: Country;
  teams: Teams;
  scores: Scores;
  odds: Odd[];
}
