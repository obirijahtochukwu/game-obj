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
