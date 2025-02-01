import { Dispatch } from "react";
import { gamble, video_poker_deck } from "../../../lib/types";

export const evaluateHand = (hand: video_poker_deck[], gamble: gamble, setGamble: Dispatch<gamble>) => {
  const rankCounts = {};
  hand.forEach((card: video_poker_deck) => {
    rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
  });
  const counts = Object.values(rankCounts);
  console.log(payoutTable["Royal Flush"]);
  setGamble({ ...gamble, multiplier: 78 });
  // Check for specific hand combina  setGamble({ ...gamble, multiplier: 78 });tions
  if (isRoyalFlush(hand)) {
    setGamble({ ...gamble, multiplier: payoutTable["Royal Flush"] });
    return { result: "win", multiplier: payoutTable["Royal"] };
  } else if (isStraightFlush(hand)) {
    setGamble({ ...gamble, multiplier: payoutTable["Straight Flush"] });
    return { result: "win", multiplier: payoutTable["Straight"] };
  } else if (counts.includes(4)) {
    setGamble({ ...gamble, multiplier: payoutTable["FourOfAKind"] });
    return { result: "win", multiplier: payoutTable["FourOfAKind"] };
  } else if (counts.includes(3) && counts.includes(2)) {
    setGamble({ ...gamble, multiplier: payoutTable["FullHouse"] });
    return { result: "win", multiplier: payoutTable["FullHouse"] };
  } else if (isFlush(hand)) {
    setGamble({ ...gamble, multiplier: payoutTable["Flush"] });
    return { result: "win", multiplier: payoutTable["Flush"] };
  } else if (isStraight(hand)) {
    setGamble({ ...gamble, multiplier: payoutTable["Straight"] });
    return { result: "win", multiplier: payoutTable["Straight"] };
  } else if (counts.includes(3)) {
    setGamble({ ...gamble, multiplier: payoutTable["ThreeOfAKind"] });
    return { result: "win", multiplier: payoutTable["ThreeOfAKind"] };
  } else if (countPairs(counts) === 2) {
    setGamble({ ...gamble, multiplier: payoutTable["TwoPair"] });
    return { result: "win", multiplier: payoutTable["TwoPair"] };
  } else if (counts.includes(2)) {
    setGamble({ ...gamble, multiplier: payoutTable["OnePair"] });
    return { result: "win", multiplier: payoutTable["OnePair"] };
  } else {
    return { result: "loss", multiplier: 0 };
  }
};

// Helper functions for checking hand combinations
const isRoyalFlush = (hand: video_poker_deck[]) => {
  const royalFlushRanks = ["10", "J", "Q", "K", "A"];
  const suit = hand[0].suit;
  return hand.every((card) => card.suit === suit && royalFlushRanks.includes(card.rank));
};

const isStraightFlush = (hand: video_poker_deck[]) => {
  return isFlush(hand) && isStraight(hand);
};

const isFlush = (hand: video_poker_deck[]) => {
  const suit = hand[0].suit;
  return hand.every((card) => card.suit === suit);
};

const isStraight = (hand: video_poker_deck[]) => {
  const sortedHand = [...hand].sort((a, b) => {
    const rankOrder = {
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "10": 10,
      J: 11,
      Q: 12,
      K: 13,
      A: 14,
    };
    return rankOrder[a.rank] - rankOrder[b.rank];
  });

  for (let i = 0; i < sortedHand.length - 1; i++) {
    const currentRank = sortedHand[i].rank;
    const nextRank = sortedHand[i + 1].rank;

    // Handle Ace as both low and high for straight
    if (currentRank === "A" && nextRank === "2") {
      continue; // Ace can be low in a straight (A, 2, 3, 4, 5)
    }

    const rankOrder = {
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "10": 10,
      J: 11,
      Q: 12,
      K: 13,
      A: 14,
    };

    if (rankOrder[nextRank] - rankOrder[currentRank] !== 1) {
      return false;
    }
  }

  return true;
};

const countPairs = (counts) => {
  return counts.filter((count) => count === 2).length;
};

export const suits = ["♠", "♥", "♦", "♣"];
export const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export const payoutTable = {
  "Royal Flush": 800,
  "Straight Flush": 50,
  FourOfAKind: 25,
  FullHouse: 9,
  Flush: 6,
  Straight: 4,
  ThreeOfAKind: 3,
  TwoPair: 2,
  OnePair: 1,
};

export const shuffle = (deck: video_poker_deck[]) => {
  return [...deck].sort(() => Math.random() - 0.5); // Create a copy of the deck to avoid mutating the original
};

export const initializeDeck = () => {
  const deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ rank, suit });
    }
  }
  return shuffle(deck);
};
