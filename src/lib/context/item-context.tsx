"use client";
import {
  createContext,
  SetStateAction,
  useState,
  Dispatch,
  useEffect,
  ReactNode,
} from "react";

export type Item = {
  price: number;
  description: Array<string>; // Specify the type of elements in the array
  image: string;
  type: string;
  stock: number;
  productName: string;
  brand: string;
  id: string;
  sale: boolean;
  discount: number;
  createdAt: string;
};

export type ItemContextType = {
  items: Item[] | null;
  isLoading: boolean;
  postItem: ((itemData: {}) => Promise<void>) | null;
  getItems: (() => Promise<void>) | null;
};

export const ItemContext = createContext({} as ItemContextType);

type ItemContextProviderProps = {
  children: ReactNode;
};

export default function ItemContextProvider({
  children,
}: ItemContextProviderProps) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const postItem = async (itemData: {}) => {
    try {
      const res = await fetch("https://techbyte-store.vercel.app/api/items/", {
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
      setIsLoading(true);
      const res = await fetch("https://techbyte-store.vercel.app/api/items/");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      let data = await res.json();
      setIsLoading(false);
      return setItems(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <ItemContext.Provider
      value={{
        isLoading,
        items,
        postItem,
        getItems,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}
