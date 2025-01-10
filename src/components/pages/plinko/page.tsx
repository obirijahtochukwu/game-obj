import React, { FormEvent, useEffect, useRef, useState } from "react";
import Settings from "./ui/settings";
import { Icons } from "../../ui/icons";
import Details from "./ui/details";
import { BallManager } from "./game/classes/BallManager";
import { baseURL } from "../../../lib/paths";
import axios from "axios";
import { predict } from "../../../lib/predict";
import { useGlobalContext } from "../../../lib/global-context";
import { filteredAndPublicGameHistory } from "../../../lib/utils/filtered-and-public-game-histor";
import Table from "../../ui/table";
import { submitGame } from "../../../lib/utils/submit-game";
import { backend_api } from "../../../lib/constants";

export default function Plinko() {
  const [setting, setSetting] = useState(false);
  const [filterLabels, setFilterLabels] = useState(["all bets"]);
  const [rows, setRows] = useState(16);
  const [multiplier, setMultiplier] = useState(1);
  const [betAmount, setBetAmount] = useState(null);
  const [ballManager, setBallManager] = useState<BallManager>();
  const canvasRef = useRef<any>();

  const { user, getGamesHishtory } = useGlobalContext();
  const getHistory = () => getGamesHishtory(user.info._id, user.info);
  const data = user?.gameHistory?.filter(({ game }) => game == "Plinko");

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        // ts-ignore
        rows,
        canvasRef.current as unknown as HTMLCanvasElement
      );
      setBallManager(ballManager);
    }
  }, [canvasRef]);

  const startGame = async (e: FormEvent) => {
    e.preventDefault();
    setSetting(false);

    try {
      const response = await axios.post(backend_api + "/plinko", {
        data: 1,
      });
      console.log(response);

      if (ballManager) {
        ballManager.addBall(response.data.point);
        const winOrLoss = response.data.point == multiplier ? "win" : "loss";
        submitGame(
          {
            userId: user.info._id,
            username: user.info.name,
            game: "Plinko",
            result: winOrLoss,
            betAmount: betAmount,
            multiplier: multiplier,
            payout: betAmount * multiplier,
          },
          getHistory
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const props = {
    title: "Plinko",
    data: filteredAndPublicGameHistory(data, filterLabels),
    filterLabels,
    setFilterLabels,
    startGame,
    setting,
    setSetting,
    multiplier,
    setMultiplier,
    betAmount,
    setBetAmount,
  };

  return (
    <article>
      <section className="bg-muted rounded-3xl mb-10">
        <div className="flex gap-7 p-4">
          <Settings {...props} />
          <main className="sm:h-[700px] h-96 w-full lg:w-[calc(100%-384px)] bg-dark rounded-3xl relative flex justify-center">
            <Icons.setting
              onClick={() => setSetting(!setting)}
              className=" absolute top-4 left-4 z-10 lg:hidden cursor-pointer"
            />
            <canvas
              ref={canvasRef}
              width="700"
              height="700"
              className=" max-sm:scale-[0.9] scale-90 relative -left-6"
            ></canvas>
          </main>
        </div>
        <div className=" bg-dark h-16 flex items-center justify-between px-8 text-primary text-2xl font-semibold rounded-b-3xl">
          Webet <Icons.expand className=" cursor-pointer" />
        </div>
      </section>
      <Table {...props} />
    </article>
  );
}
