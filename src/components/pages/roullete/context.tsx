import React, { createContext, Dispatch, FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SMSoundService } from "../../../lib/hooks/useSoundProvider";
import { coin, slotCoin } from "../../../lib/types";
import axios from "axios";
import { useGlobalContext } from "../../../lib/global-context";
import { submitGame } from "../../../lib/utils/submit-game";
import internal from "stream";
import anime from "./../../../../node_modules/animejs/lib/anime.es";
import { board } from "./mock-data";
import { generateRandomNumber } from "../../../lib/utils/generateRandomNumber";
import gameSoundEffect from "../../../lib/utils/game-sound-effect";
import { userExist } from "../../../lib/utils";

interface gamble {
  betAmount: null | number;
  payout: null | number;
  multiplier: null | number;
  outcomes: number[] | string[] | any;
}

interface context {
  gamble?: gamble;
  setGamble?: Dispatch<gamble>;
  startGame?: (e: FormEvent, number?: number) => void;
  isSetting?: boolean;
  setIsSetting?: Dispatch<boolean>;
  setIsGameActive?: Dispatch<boolean>;
  isGameActive?: boolean;
  board?: {
    num: number;
    color: string;
  }[];
  introTip?: number;
  setIntroTip?: Dispatch<number>;
}

const AppContext = createContext<context>({});

const initialSate = {
  outcomes: [],
  betAmount: 0,
  payout: null,
  multiplier: null,
};

const AppProvider = ({ children }) => {
  const { user, getGamesHishtory, setIsLogin, setIsBetLoading } = useGlobalContext();
  const getHistory = (result: string, amount: number) => getGamesHishtory(result, amount, user.info);

  const [introTip, setIntroTip] = useState(1);
  const [gamble, setGamble] = useState(initialSate);
  const [isSetting, setIsSetting] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [wheel, setWheel] = useState({
    totalNumbers: 37,
    singleSpinDuration: 5000,
    singleRotationDegree: 360 / 37,
    lastNumber: 0,
  });

  const getRouletteIndexFromNumber = (number: string) => {
    return board.map(({ num }) => num).indexOf(parseInt(number));
  };

  const getRotationFromNumber = (number: string) => {
    var index = getRouletteIndexFromNumber(number);
    return wheel.singleRotationDegree * index;
  };

  // rotateTo randomizes the end outcome of the wheel
  // so it doesn't only end at 0 at the top
  const getRandomEndRotation = (minNumberOfSpins: number, maxNumberOfSpins: number) => {
    var rotateTo = anime.random(minNumberOfSpins * wheel.totalNumbers, maxNumberOfSpins * wheel.totalNumbers);

    return wheel.singleRotationDegree * rotateTo;
  };
  // calculating where the zero will be at the end of the spin
  // because we are spinning it counter clockwise we are substracting it of 360
  const getZeroEndRotation = (totalRotaiton: number) => {
    var rotation = 360 - Math.abs(totalRotaiton % 360);

    return rotation;
  };
  // Where the ball end position should be
  // we are calculating this based on the zero rotation
  // and how much the wheel spins
  const getBallEndRotation = (zeroEndRotation: number, number: any) => {
    return Math.abs(zeroEndRotation) + getRotationFromNumber(number);
  };
  // randomizing the number of spins that the ball should make
  // so every spin is different
  const getBallNumberOfRotations = (minNumberOfSpins: number, maxNumberOfSpins: number) => {
    var numberOfSpins = anime.random(minNumberOfSpins, maxNumberOfSpins);
    return 360 * numberOfSpins;
  };

  const checkIfPlayerWon = (number: number | string, numbersArray: any) => {
    const isEven = +number % 2 === 0;
    const isInArray = numbersArray.includes(number);

    const handleSubmitGame = (result: string) => {
      setIsBetLoading(true);
      const refresh = () => {
        setGamble(initialSate);
      };
      submitGame(
        {
          userId: user.info._id,
          username: user.info.name,
          game: "Roullete",
          result: result,
          betAmount: gamble.betAmount,
          multiplier: gamble.multiplier,
          payout: result == "win" ? gamble.payout : 0,
        },
        getHistory,
        refresh,
      );
    };

    if (isInArray) {
      gameSoundEffect("win");
      handleSubmitGame("win");
    } else if (isEven && gamble.outcomes.includes("Even")) {
      handleSubmitGame("win");
      gameSoundEffect("win");
    } else if (!isEven && gamble.outcomes.includes("Odd")) {
      gameSoundEffect("win");
      handleSubmitGame("win");
    } else {
      gameSoundEffect("loss");
      handleSubmitGame("loss");
    }
    setIsGameActive(false);
    setWheel({ ...wheel, lastNumber: +number });
  };

  // click to start game
  const startGame = (e: FormEvent, number: number) => {
    e.preventDefault();
    setIsSetting(false);
    if (userExist) {
      if (gamble.outcomes.length < 1) {
        toast.error("Please select atleast one outcome");
      } else {
        setIsGameActive(true);
        SMSoundService.coin();

        const bezier = [0.165, 0.84, 0.44, 1.005];
        var ballMinNumberOfSpins = 2;
        var ballMaxNumberOfSpins = 4;
        var wheelMinNumberOfSpins = 2;
        var wheelMaxNumberOfSpins = 4;

        var lastNumberRotation = getRotationFromNumber(wheel.lastNumber.toString()); //anime.get(wheel, "rotate", "deg");

        // minus in front to reverse it so it spins counterclockwise
        var endRotation = -getRandomEndRotation(ballMinNumberOfSpins, ballMaxNumberOfSpins);
        var zeroFromEndRotation = getZeroEndRotation(endRotation);
        var ballEndRotation =
          getBallNumberOfRotations(wheelMinNumberOfSpins, wheelMaxNumberOfSpins) +
          getBallEndRotation(zeroFromEndRotation, number);

        // reset to the last number
        anime.set([".layer-2", ".layer-4"], {
          rotate: function () {
            return lastNumberRotation;
          },
        });
        // reset zero
        anime.set(".ball-container", {
          rotate: function () {
            return 0;
          },
        });

        anime({
          targets: [".layer-2", ".layer-4"],
          rotate: function () {
            return endRotation; // random number
          },
          duration: wheel.singleSpinDuration, // random duration
          easing: `cubicBezier(${bezier.join(",")})`,
          complete: function (anim: any) {
            checkIfPlayerWon(number, gamble.outcomes);
          },
        });
        // aniamte ball
        anime({
          targets: ".ball-container",
          translateY: [
            { value: 0, duration: 2000 },
            { value: 20, duration: 1000 },
            { value: 25, duration: 900 },
            { value: 50, duration: 1000 },
          ],
          rotate: [{ value: ballEndRotation, duration: wheel.singleSpinDuration }],
          loop: 1,
          easing: `cubicBezier(${bezier.join(",")})`,
        });
      }
    } else {
      setIsLogin(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        startGame,
        isSetting,
        setIsSetting,
        setIsGameActive,
        isGameActive,
        gamble,
        setGamble,
        board,
        introTip,
        setIntroTip,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for context
export const useRoulleteContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
