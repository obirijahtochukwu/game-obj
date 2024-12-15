import axios from "axios";
import { gameHistory } from "../types";

export const submitGame = async (data: gameHistory, getHistory) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/add-game",
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
