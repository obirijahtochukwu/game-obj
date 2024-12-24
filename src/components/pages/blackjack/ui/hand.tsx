const Hand = ({ cards, title, handValue, score }: any) => {
  return (
    <div className="p-4">
      <h4 className="font-medium mb-1">Wins: {score}</h4>
      <h2 className="mb-2 bg-white text-slate-900 text-lg font-medium px-3 py-2 rounded-md">
        {title}: <b>{handValue}</b>
      </h2>
      <div className="flex flex-wrap items-center gap-1">
        {cards.map((card: any, index: number) => (
          <Card key={index} card={card} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Hand;

const Card = ({ card, index }) => {
  return (
    <div
      className={`${
        index == 0
          ? " text-muted"
          : index == 1
          ? " text-red-700"
          : index == 2
          ? " text-secondary"
          : " text-blue-700"
      } w-24 h-32 bg-white border rounded-lg shadow-md flex flex-col items-center  justify-items-start text-xl animate-[pulse_1s_ease-in-out]`}
    >
      <p className="flex justify-end">{card.rank}</p>
      <h1 className="text-6xl">{card.suit}</h1>
    </div>
  );
};
