import axios from "axios";
import { gameHistory } from "../types";
import { backend_api } from "../constants";
import gameSoundEffect from "./game-sound-effect";

export const submitGame = async (data: gameHistory, getHistory) => {
  gameSoundEffect(data?.result);
  try {
    const response = await axios.post(
      backend_api + "/add-game",
      { ...data },
      { withCredentials: true }
    );
    console.log(response);

    if (response.data.betAmount) {
      getHistory();
    }
  } catch (error) {
    console.log(error);
  }
};
