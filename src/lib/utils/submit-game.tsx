import axios from "axios";
import { gameHistory } from "../types";
import { backend_api } from "../constants";
import gameSoundEffect from "./game-sound-effect";

export const submitGame = async (data: gameHistory, getHistory, refresh?: () => void) => {
  gameSoundEffect(data?.result);
  const amount = data?.result == "win" ? data?.payout : data?.betAmount;
  try {
    const response = await axios.post(backend_api + "/add-game", { ...data }, { withCredentials: true });

    if (response.data.betAmount) {
      getHistory(data?.result, amount);
      console.log({ response, amount });
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (refresh) {
      console.log("yyy");

      refresh();
    }
  }
};
