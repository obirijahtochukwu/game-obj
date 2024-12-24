export const calculateHandValue = (hand) => {
  let value = 0;
  let aceCount = 0;

  hand.forEach((card) => {
    if (card.rank === "J" || card.rank === "Q" || card.rank === "K") {
      value += 10;
    } else if (card.rank === "A") {
      aceCount += 1;
      value += 11;
    } else {
      value += parseInt(card.rank);
    }
  });

  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount -= 1;
  }

  return value;
};

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
export const combinations = suits.flatMap((suit) =>
  ranks.map((rank) => ({ suit, rank }))
);

export default function Result({ result }: any) {
  return (
    <div
      className={`text-white font-bold rounded-md text-center mt-4 py-2 ${
        result?.type === "player" ? "bg-green-600" : "bg-red-700"
      }`}
    >
      <h2 className="text-2xl ">{result?.message}</h2>
    </div>
  );
}
