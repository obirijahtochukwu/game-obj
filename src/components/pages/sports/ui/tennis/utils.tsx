import axios from "axios";
import { api } from "../../../../../lib/constants";

export const fetchData = async ({ tennisSate, setTennisSate }) => {
  setTennisSate({ ...tennisSate, loading: true });
  try {
    const response = await axios.get(
      `${api.sports_url}markets?sport_id=2&is_have_odds=true`,
      {
        headers: api.sports_headers,
      }
    );
    console.log(response);

    setTennisSate({
      loading: false,
      data: response.data.events.filter((item, idx) => idx < 10),
    });
  } catch (error) {
    console.log(error);
    setTennisSate({ ...tennisSate, loading: false });
  } finally {
  }
};
