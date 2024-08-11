import axios from "axios";

export function storeData(data: object, table: string) {
  axios.post(
    `https://modernize-eb7ad-default-rtdb.firebaseio.com/${table}.json`,
    data
  );
};
