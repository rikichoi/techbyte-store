"use client";
import {
  createContext,
  SetStateAction,
  useState,
  Dispatch,
  useEffect,
  ReactNode,
} from "react";

export type NewCartItem = {
  newItems: NewCartItemData[];
};

export type NewCartItemData = {
  name: string;
  quantity: number;
  price: number;
};

export type CartItems = {
  name: string;
  quantity: number;
  price: number;
};

export type Cart = {
  _id: string;
  items: CartItems[];
};

export type CartContextType = {
  cart:Cart|null;
  editCart: ((id: string, newItems: NewCartItem) => Promise<void>) | null;
  getCart: (() => Promise<void>) | null;
};

export const CartContext = createContext({} as CartContextType);

type CartContextProviderProps = {
  children: ReactNode
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<Cart|null>({ _id: "", items: [] });

  const editCart =  async (id: string, newItems: NewCartItem) => {
    try {
      const res = await fetch(`https://techbyte-store.vercel.app/api/carts?id=${id}`, {
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
      const res = await fetch("https://techbyte-store.vercel.app/api/carts/", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      let data = await res.json();
      return setCart(data.carts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        editCart,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
