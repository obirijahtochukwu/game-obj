import React, { useEffect, useState } from "react";
import { SMSoundService } from "../../../lib/hooks/useSoundProvider";
import { ALL_SYMBOLS, SYMBOLS_FOOD, SYMBOLS_RANDOM } from "./ui/symbols";
import Settings from "./ui/settings";
import { Icons } from "../../ui/icons";
import Game from "./ui/game";
import Table from "../../ui/table";

export default function Slot() {
  const [setting, setSetting] = useState(false);
  const [segments, setSegments] = useState(34);
  const [picks, setPicks] = useState([]);
  const [play, setPlay] = useState(false);
  const [playState, setPlayState] = useState({ label: "", value: "" });

  const handleClick = () => {
    console.log("");
    setPlay(true);
    setPicks([]);
    SMSoundService.coin();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (play) {
        SMSoundService.blip();
      }
    }, 100);
    return () => clearInterval(timer);
  }, [play]);

  useEffect(() => {
    if (picks.length > 3) {
      setPlay(false);
      const h = picks.filter(({ id }, idx) => {
        const ho = picks
          .map((p) => {
            if (p.id == id) {
              return p;
            }
          })
          .filter((coin) => coin?.id);
        if (ho.length > 1) {
          setPlayState({ value: ho[0].coin, label: "win" });
        } else {
          setPlayState({ ...playState, label: "fail" });
        }
      });
    }
  }, [picks]);

  useEffect(() => {
    if (playState.label == "win") {
      SMSoundService.win();
    } else if (playState) {
      SMSoundService.unlucky();
    }
  }, [playState]);

  const props = {
    segments,
    setSegments,
    handleClick,
    setting,
    setSetting,
    picks,
    setPicks,
    setPlay,
    play,
  };

  return (
    <article>
      <section className="bg-muted rounded-3xl mb-10">
        <div className="flex gap-7 p-4">
          <Settings {...props} />
          <main className="sm:h-[600px] h-96 w-full lg:w-[calc(100%-384px)] bg-dark rounded-3xl relative flex flex-col items-center justify-center p-8">
            <Icons.setting
              onClick={() => setSetting(!setting)}
              className=" absolute top-4 left-4 z-10 lg:hidden cursor-pointer"
            />
            <Game {...props} />
            <footer className=" min-w-full grid grid-cols-4 gap-8 mt-auto">
              {picks?.map(({ coin }) => (
                <div
                  key={coin}
                  className={`bg-advance h-12 flex items-center justify-center rounded-lg text-primary text-xl font-semibold border-b-4 ${
                    playState.value == coin
                      ? " border-b-[#16a34a] bg-primary"
                      : "border-secondary"
                  }`}
                >
                  {coin}
                </div>
              ))}
            </footer>
          </main>
        </div>
        <div className=" bg-advance h-16 flex items-center justify-between px-8 text-primary text-2xl font-semibold rounded-b-3xl">
          Webet <Icons.expand className=" cursor-pointer" />
        </div>
      </section>
      <Table title="Dice Roll" />
    </article>
  );
}
