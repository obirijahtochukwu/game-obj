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
import { userExist } from "../../../lib/utils";
import { AppProvider, usePlinkoContext } from "./context";

export default function Plinko() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

function App() {
  const [setting, setSetting] = useState(false);
  const [filterLabels, setFilterLabels] = useState(["all bets"]);
  const [rows, setRows] = useState(16);
  const [multiplier, setMultiplier] = useState(1);
  const [betAmount, setBetAmount] = useState(null);
  const [ballManager, setBallManager] = useState<BallManager>();
  const canvasRef = useRef<any>();

  const { user, getGamesHishtory, setIsLogin, setIsBetLoading } = useGlobalContext();
  const getHistory = (result: string, amount: number) => getGamesHishtory(result, amount, user.info);
  const data = user?.gameHistory?.filter(({ game }) => game == "Plinko");

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        // ts-ignore
        rows,
        canvasRef.current as unknown as HTMLCanvasElement,
      );
      setBallManager(ballManager);
    }
  }, [canvasRef]);

  const startGame = async (e: FormEvent) => {
    e.preventDefault();
    setSetting(false);

    try {
      if (userExist) {
        const response = await axios.post(backend_api + "/plinko", {
          data: 1,
        });

        if (ballManager) {
          ballManager.addBall(response.data.point);
          setIsBetLoading(true);
          const refresh = () => {
            setBetAmount(null);
            setMultiplier(1);
          };
          submitGame(
            {
              userId: user.info._id,
              username: user.info.name,
              game: "Plinko",
              result: response.data.point == multiplier ? "win" : "loss",
              betAmount: betAmount,
              multiplier: multiplier,
              payout: response.data.point == multiplier ? betAmount * multiplier : 0,
            },
            getHistory,
            refresh,
          );
        }
      } else {
        setIsLogin(true);
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
      <section className="mb-10 rounded-3xl bg-muted">
        <div className="flex gap-7 p-4">
          <Settings {...props} />
          <main className="relative flex h-96 w-full justify-center rounded-3xl bg-dark sm:h-[700px] lg:w-[calc(100%-384px)]">
            <Icons.setting onClick={() => setSetting(!setting)} className="absolute left-4 top-4 z-10 cursor-pointer lg:hidden" />
            <canvas ref={canvasRef} width="700" height="700" className="relative -left-6 scale-90 max-sm:scale-[0.9]"></canvas>
          </main>
        </div>
        <div className="flex h-16 items-center justify-between rounded-b-3xl bg-dark px-8 text-2xl font-semibold text-primary">
          Webet <Icons.expand className="cursor-pointer" />
        </div>
      </section>
      <Table {...props} />
    </article>
  );
}
