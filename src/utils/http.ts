import axios from "axios";

export function storeData(data: object, table: string) {
  axios.post(
    `https://react-native-course-3cceb-default-rtdb.firebaseio.com/${table}.json`,
    data
  );
}
