import React, { useState } from "react";

const suits = ["♠", "♥", "♦", "♣"];
const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const initializeDeck = () => {
  const deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ rank, suit });
    }
  }
  return shuffle(deck);
};

const shuffle = (deck) => deck.sort(() => Math.random() - 0.5);

const Game = () => {
  const [deck, setDeck] = useState(initializeDeck());
  const [hand, setHand] = useState([]);
  const [heldCards, setHeldCards] = useState([]);
  const [balance, setBalance] = useState(1000); // Player's balance
  const [bet, setBet] = useState(10); // Default bet
  const [message, setMessage] = useState("");

  const payoutTable = {
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

  const deal = () => {
    const newDeck = shuffle(deck);
    setDeck(newDeck.slice(5));
    setHand(newDeck.slice(0, 5));
    setHeldCards([]);
    setMessage("");
  };

  const toggleHold = (index) => {
    setHeldCards((prevHeld) =>
      prevHeld.includes(index)
        ? prevHeld.filter((i) => i !== index)
        : [...prevHeld, index]
    );
  };

  const redraw = () => {
    const newHand = hand.map((card, index) =>
      heldCards.includes(index) ? card : deck.pop()
    );
    setDeck(deck.slice(5 - heldCards.length));
    setHand(newHand);
    evaluateHand(newHand);
  };

  const evaluateHand = (hand) => {
    // Simplified evaluation (you can expand this logic)
    const rankCounts = {};
    hand.forEach((card) => {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    });
    const counts = Object.values(rankCounts);
    if (counts.includes(4)) {
      setMessage("Four of a Kind! You win!");
      setBalance(balance + bet * payoutTable["FourOfAKind"]);
    } else if (counts.includes(3) && counts.includes(2)) {
      setMessage("Full House! You win!");
      setBalance(balance + bet * payoutTable["FullHouse"]);
    } else {
      setMessage("No win. Try again!");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Video Poker</h1>
      <div className="flex justify-between items-center mb-4">
        <div>Balance: ${balance}</div>
        <div>
          Bet: $
          <input
            type="number"
            className="border px-2 py-1 w-16"
            value={bet}
            min="1"
            max={balance}
            onChange={(e) => setBet(parseInt(e.target.value))}
          />
        </div>
      </div>

      {/* Card Display */}
      <div className="grid grid-cols-5 gap-4">
        {hand.map((card, index) => (
          <div key={index} onClick={() => toggleHold(index)}>
            <div
              className={`${
                index == 0
                  ? " text-muted"
                  : index == 1
                  ? " text-red-700"
                  : index == 2
                  ? " text-secondary"
                  : " text-blue-700"
              } ${
                heldCards.includes(index) ? "!bg-yellow-200" : "bg-white"
              } w-24 h-32 border rounded-lg shadow-md flex flex-col items-center  justify-items-start text-xl animate-[pulse_1s_ease-in-out]`}
            >
              <p className="flex justify-end">{card.rank}</p>
              <h1 className="text-6xl">{card.suit}</h1>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={deal}
          className="bg-blue-500 text-white px-4 py-2 mr-4"
        >
          Deal
        </button>
        <button onClick={redraw} className="bg-green-500 text-white px-4 py-2">
          Redraw
        </button>
      </div>

      {/* Message */}
      <div className="mt-4 text-lg text-center">{message}</div>

      {/* Payout Table */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Payout Table</h2>
        <ul>
          {Object.entries(payoutTable).map(([hand, multiplier]) => (
            <li key={hand}>
              {hand}: {multiplier}x
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
