import axios from "axios";
import { backend_api } from "../constants";
import { useEffect, useState } from "react";

export const get = (path: string) => {
  return axios.get(backend_api + path);
};

export const getRequest = (path: string) => {
  let response;
  get(path).then((res) => {
    response = res;
    console.log(response);
  });
  console.log(response);

  return response;
};

// export default getRequest;

export const useAxios = (labels: string[]) => {
  const [data, setData] = useState<any>({});
  useEffect(() => {
    labels.map((label) =>
      axios
        .get(backend_api + "/" + label)
        .then((res) => setData({ ...data, [label]: res.data }))
    );
  }, []);

  return { data };
};
