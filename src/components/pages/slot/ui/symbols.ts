export const SYMBOLS_CLASSIC = [
  "🍋",
  "🍊",
  "🍉",
  "🍈",
  "🍇",
  "🥝",
  "🍓",
  "🍒",
  "🌟",
  "🍀",
  "💎",
  "🎰",
];

export const SYMBOLS_CHRISTMAS = [
  "🧣",
  "⛄",
  "🎄",
  "🎁",
  "🎀",
  "🍾",
  "🍷",
  "🔔",
  "🌟",
  "🦌",
  "🎅",
];

export const SYMBOLS_HALLOWEEN = [
  "🌚",
  "🎃",
  "🦇",
  "😈",
  "🧠",
  "👹",
  "👽",
  "🤡",
  "👻",
  "🧟‍",
  "🧛‍",
  "💀",
];

export const SYMBOLS_ANIMALS = [
  "🐞",
  "🐟",
  "🐭",
  "🐸",
  "🐓",
  "🐷",
  "🦀",
  "🐍",
  "🦊‍",
  "🦁",
  "🦕",
  "🦖",
];

export const SYMBOLS_SPORTS = [
  "🎯",
  "🎱",
  "🏐",
  "⛳",
  "⚾",
  "🏈",
  "🏀",
  "⚽",
  "🥉",
  "🥈",
  "🥇",
  "🏆",
];

export const SYMBOLS_LOVE = [
  "💌",
  "🎁",
  "📸",
  "💘",
  "💋",
  "🔞",
  "💑",
  "💍",
  "💎",
  "💖",
];

export const SYMBOLS_FORTUNE = [
  "🎴",
  "🎲",
  "🕶",
  "🥃",
  "💷",
  "💴",
  "💵",
  "💰",
  "🍀",
  "💎",
  "🎰",
  "🧞‍️",
  "🃏",
];

export const SYMBOLS_FOOD = [
  { id: "1", coin: "🥦" },
  { id: "2", coin: "🍋" },
  { id: "3", coin: "🍆" },
  { id: "4", coin: "🍙" },
  { id: "5", coin: "🍯" },
  { id: "6", coin: "🍑" },
  { id: "7", coin: "🍓" },
  { id: "8", coin: "🍭" },
  { id: "9", coin: "🍫" },
  { id: "10", coin: "🍩" },
  { id: "11", coin: "🍕" },
  { id: "12", coin: "🍗" },
];

export const ALL_SYMBOLS = [
  SYMBOLS_CLASSIC,
  SYMBOLS_CHRISTMAS,
  SYMBOLS_HALLOWEEN,
  SYMBOLS_ANIMALS,
  SYMBOLS_SPORTS,
  SYMBOLS_LOVE,
  SYMBOLS_FORTUNE,
  SYMBOLS_FOOD,
];

export const SYMBOLS_RANDOM = () =>
  ALL_SYMBOLS[(Math.random() * ALL_SYMBOLS.length) | 0];
