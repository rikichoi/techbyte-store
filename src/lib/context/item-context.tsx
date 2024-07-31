"use client";
import {
  createContext,
  SetStateAction,
  useState,
  Dispatch,
  useEffect,
} from "react";

export const itemContext = createContext({
  items: [],
  postItem: async (itemData: {}) => {},
  getItems: async () => {},
});

export default function ItemContextProvider({ children }) {
  const [items, setItems] = useState([]);

  const postItem = async (itemData: {}) => {
    try {
      const res = await fetch("http://localhost:3000/api/items/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(itemData),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getItems = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/items/", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return setItems(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <itemContext.Provider
      value={{
        items,
        postItem,
        getItems,
      }}
    >
      {children}
    </itemContext.Provider>
  );
}
