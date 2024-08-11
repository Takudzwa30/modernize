// hooks/useStoreData.ts
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useStoreData() {
  const { data, error } = useSWR('/data', fetcher);

  const storeData = async (data: object, table: string) => {
    try {
      await fetch(
        `https://modernize-eb7ad-default-rtdb.firebaseio.com/${table}.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      // Optionally, invalidate the cache or refetch data if needed
      mutate('/data'); // Assuming /data is the key used for fetching data
    } catch (err) {
      console.error('Error storing data:', err);
    }
  };

  const getData = async (table: string) => {
    try {
      const response = await fetch(
        `https://modernize-eb7ad-default-rtdb.firebaseio.com/${table}.json`
      );
      const result = await response.json();
      return result;
    } catch (err) {
      console.error('Error fetching data:', err);
      return null;
    }
  };

  return { data, error, storeData, getData };
}
