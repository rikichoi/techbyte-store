"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let lastScrollY = 0;
      const navBarReference = document.getElementById("nav");
      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
          console.log("scrool Down");
          setActive(false);
        } else {
          console.log("scroll Up");
          setActive(true);
        }
        lastScrollY = currentScrollY;
      });
    }
  }, []);

  const [itemList, setItemList] = useState<any>({});

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/items/", {
          cache: "no-store",
        });
        if(!res.ok){
          throw new Error("Failed to fetch data");
        }
        return (setItemList(await res.json()));
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, []);

  return (
    <div
      className={`${
        active ? "h-[13vh]" : "h-0"
      } fixed transition-all grid grid-cols-5 px-24 gap-2 items-center delay-150 duration-100 border-b-2 overflow-hidden border-zinc-500 w-full bg-white z-50"`}
    >
      <h1 className="text-5xl">Logo</h1>
      <ul className="flex col-span-3 flex-row max-w-2xl w-full justify-between">
        <li>
          <Link href={""}>Home</Link>
        </li>
        <li>
          <Link href={""}>Shop</Link>
        </li>
        <li>
          <Link href={""}>Discounts</Link>
        </li>
        <li>
          <Link href={""}>Contact</Link>
        </li>
        <li>
          <Link href={""}>Blog</Link>
        </li>
        <li>
          <Link href={""}>Register/Sign In</Link>
        </li>
      </ul>
      <div className="w-full  justify-end items-end flex">
        <button
          type="button"
          onClick={()=>console.log(itemList.items)}
          className="relative max-w-8 inline-flex items-center text-sm font-medium justify-center text-center  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaCartShopping className="text-3xl text-[#15b7b9]"></FaCartShopping>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            {itemList.items && itemList.items.length && itemList.items.length}
          </div>
        </button>
      </div>
    </div>
  );
}
