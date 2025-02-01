export interface coin {
  coin: string;
  id: string;
}

export interface slotCoin {
  id: string;
  data: {
    id: string;
    coin: string;
  }[];
  animation: string;
}

export type changeEvent = React.ChangeEvent<HTMLInputElement>;
export type inputEvent = React.InputHTMLAttributes<HTMLInputElement>;

export interface gameHistory {
  betAmount?: number;
  createdAt?: string;
  game?: string;
  multiplier?: number;
  payout?: number;
  result?: string;
  userId?: string;
  username?: "tuyrsdufuk";
  __v?: number;
  _id?: string;
}
export interface userData {
  loggedIn: string;
  info: { name?: string; _id?: string } | any;
  gameHistory: gameHistory[];
}

export interface gamble {
  betAmount?: null | number;
  payout?: null | number;
  multiplier?: null | number;
  outcomes?: number[] | string[] | any;
}

export interface video_poker_deck {
  rank: string;
  suit: string;
}

export interface payoutTable {
  "Royal Flush": number;
  "Straight Flush": number;
  FourOfAKind: number;
  FullHouse: number;
  Flush: number;
  Straight: number;
  ThreeOfAKind: number;
  TwoPair: number;
  OnePair: number;
}

export interface AdminData {
  loggedIn?: string;
  _id?: string;
  page_views?: number;
  monthly_users?: number;
  new_signups?: number;
  total_payouts?: number;
  monthly_profit?: totalProfit[];
  __v?: number;
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  topGames?: topGames[];
  topPlayers?: topPlayer[];
  user_growth?: userGrowth[];
  average_bet_size?: number;
  players_win_rate?: number;
  total_players_session?: number;
  game_and_sport_stats?: GameStatistics[];
  inactive_users?: number;
  players?: User[];
}

export interface topGames {
  game: string; // Game name
  count: number; // Number of times played
}

export interface totalProfit {
  month: string; // Game name
  profit: number; // Number of times played
}

export interface topPlayer {
  userId: {
    _id: string;
    email: string;
  };
  username: string | null;
  email: string;
  betCount: number;
  profileImage: string;
}

export interface userGrowth {
  _id: number | null;
  month: string | null;
  userCount: number;
}

export interface GameStatistics {
  totalPlays: number;
  totalPayout: number;
  averageBetSize: number;
  game: string;
  winRate: number;
  lossRate: number;
  activePlayers: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  date_of_birth: string;
  language: string;
  createdAt: string;
  totalPlays?: number;
  profileImage: string;
}
