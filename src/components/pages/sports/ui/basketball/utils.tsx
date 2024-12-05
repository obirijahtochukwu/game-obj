import axios from "axios";
import { api } from "../../../../../lib/constants";

export const fetchData = async ({ basketballSate, setBasketballSate }) => {
  setBasketballSate({ ...basketballSate, loading: true });
  try {
    const response = await axios.get(
      `${api.sports_url}markets?sport_id=3&is_have_odds=true`,
      {
        headers: api.sports_headers,
      }
    );
    setBasketballSate({
      loading: false,
      data: response.data.events.filter((item, idx) => idx < 10),
    });
  } catch (error) {
    console.log(error);
    setBasketballSate({ ...basketballSate, loading: false });
  } finally {
  }
};
