// utils/useTableData.ts

import useSWR from "swr";
import { ref, push, get, set, update, remove } from "firebase/database";
import { database } from "../../firebaseConfig";

// Define a generic fetcher function with explicit typing
const fetchFromTable = <T>(url: string): Promise<T> =>
  fetch(url).then((res) => res.json());

// Custom hook to fetch data from a specific table
export const useTableData = <T>(tableName: string) => {
  const { data, error } = useSWR<Record<string, T>>(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/${tableName}.json`,
    (url: string) => fetchFromTable<Record<string, T>>(url)
  );

  //   const arrayOfOrders = Object.keys(data).map(id => ({
  //     id: id,
  //     ...data[id]
  //   }));

  if (error) {
    return {
      data: [],
      error,
      isLoading: false,
      success: false,
      message: error.message,
    };
  }

  return {
    data: data
      ? Object.keys(data).map((id) => ({
          id: id,
          ...data[id],
        }))
      : [],
    error,
    isLoading: !error && !data,
    success: true,
  };
};

// Function to add a new item to a specific table
export const addToTable = async <T>(tableName: string, item: T) => {
  try {
    const newItemRef = push(ref(database, tableName));
    await set(newItemRef, item);
    return { success: true, key: newItemRef.key }; // Return success and the new key
  } catch (error: any) {
    console.error("Error adding item:", error);
    return { success: false, error: error.message }; // Return success status and error message
  }
};

// Function to update an existing item in a specific table
export const updateInTable = async <T>(
  tableName: string,
  id: string,
  updates: Partial<T>
) => {
  try {
    await update(ref(database, `${tableName}/${id}`), updates);
    return { success: true }; // Return success status
  } catch (error: any) {
    console.error("Error updating item:", error);
    return { success: false, error: error.message }; // Return success status and error message
  }
};

// Function to delete an item from a specific table
export const deleteFromTable = async (tableName: string, id: string) => {
  try {
    await remove(ref(database, `${tableName}/${id}`));
    return { success: true }; // Return success status
  } catch (error: any) {
    console.error("Error deleting item:", error);
    return { success: false, error: error.message }; // Return success status and error message
  }
};

// Function to fetch a single Item by ID
export const fetchById = async <T>(
  orderId: string
): Promise<{ data: T | null; error: string | null }> => {
  try {
    const orderRef = ref(database, `orders/${orderId}`);
    const snapshot = await get(orderRef);

    if (snapshot.exists()) {
      return { data: snapshot.val(), error: null }; // Return the order data
    } else {
      return { data: null, error: "Order not found" }; // Handle case where order doesn't exist
    }
  } catch (error: any) {
    console.error("Error fetching order:", error);
    return { data: null, error: error.message }; // Return error message
  }
};
