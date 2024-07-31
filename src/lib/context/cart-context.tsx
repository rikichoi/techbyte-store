"use client";
import {
  createContext,
  SetStateAction,
  useState,
  Dispatch,
  useEffect,
} from "react";

export const cartContext = createContext({
  cart: [],
  editCart: async (id: string, newItems: []) => {},
  getCart: async () => {},
});

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  const editCart = async (id: string, newItems: []) => {
    try {
      const res = await fetch(`http://localhost:3000/api/carts?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newItems),
      });
      if (!res.ok) {
        throw new Error("Failed to update cart");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const getCart = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/carts/", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return setCart(await res.json());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        cart,
        editCart,
        getCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
