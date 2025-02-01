import axios from "axios";
import { gameHistory } from "../types";
import { backend_api } from "../constants";
import gameSoundEffect from "./game-sound-effect";

export const submitGame = async (data: gameHistory, getHistory) => {
  gameSoundEffect(data?.result);
  const amount = data?.result == "win" ? data?.payout : data?.betAmount;
  const payout = data?.result == "win" ? data?.payout : 0;
  try {
    const response = await axios.post(backend_api + "/add-game", { ...data, payout }, { withCredentials: true });

    if (response.data.betAmount) {
      getHistory(data?.result, amount);
      console.log({ response, amount });
    }
  } catch (error) {
    console.log(error);
  }
};
