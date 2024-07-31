"use client";
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { cartContext } from "@/lib/context/cart-context";
import Cart from "../cart/page";

export default function Navbar() {
  const { cart, editCart } = useContext(cartContext);
  const [active, setActive] = useState(true);
  const [cartItemsCount, setCartItemsCount] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let lastScrollY = 0;
      const navBarReference = document.getElementById("nav");
      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
          setActive(false);
        } else {
          setActive(true);
        }
        lastScrollY = currentScrollY;
      });
    }
  }, []);

  useEffect(() => {
    if (cart.carts) {
      setCartItemsCount(cart.carts[0].items.length);
    }
    if (!cart.carts) {
      return;
    }
  }, [cart]);

  return (
    <div
      className={`${
        active ? "h-[13vh]" : "h-0"
      } fixed transition-all grid grid-cols-5 px-24 gap-2 items-center delay-150 duration-100 border-b-2 overflow-hidden border-zinc-500 w-full bg-white z-[99999]"`}
    >
      <h1 className="text-5xl">Logo</h1>
      <ul className="flex col-span-3 flex-row max-w-2xl w-full justify-between">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/shop"}>Shop</Link>
        </li>
        <li>
          <Link href={"/"}>Discounts</Link>
        </li>
        <li>
          <Link href={"/"}>Contact</Link>
        </li>
        <li>
          <Link href={"/"}>Blog</Link>
        </li>
        <li>
          <Link href={"/"}>Register/Sign In</Link>
        </li>
      </ul>
      <div className="w-full  justify-end items-end flex">
        <Link
          type="button"
          href={"/cart"}
          className="relative max-w-8 inline-flex items-center text-sm font-medium justify-center text-center  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaCartShopping className="text-3xl text-[#15b7b9]"></FaCartShopping>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            {cartItemsCount}
          </div>
        </Link>
      </div>
    </div>
  );
}
