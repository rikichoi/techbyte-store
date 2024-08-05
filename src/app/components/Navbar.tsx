"use client";
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { cartContext } from "@/lib/context/cart-context";
import Cart from "../cart/page";
import Logo from "@/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HamburgerModal from "./HamburgerMenu";
import { navbarContext } from "@/lib/context/navbar-context";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

export default function Navbar() {
  const router = useRouter();
  const { cart, editCart } = useContext(cartContext);
  const { showModal, setShowModal } = useContext(navbarContext);
  const [active, setActive] = useState(true);
  const [cartItemsCount, setCartItemsCount] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let lastScrollY = 0;
      const navBarReference = document.getElementById("nav");
      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        if (showModal == true) {
          setActive(true);
          return;
        }
        if (showModal == false && currentScrollY > lastScrollY) {
          setActive(false);
          console.log("down");
        }
        if (showModal == false && currentScrollY < lastScrollY) {
          setActive(true);
          console.log("up");
        }
        lastScrollY = currentScrollY;
      });
    }
  }, [showModal]);

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
        active ? "h-[13vh] z-50" : "h-0 z-50"
      } fixed font-poppins transition-all xs:px-12 sm:px-14 lg:px-14 lg:grid xs:flex xs:flex-row xs:justify-between sm:flex sm:flex-row sm:justify-between lg:grid-cols-5 gap-2 items-center delay-150 duration-100 border-b-2 overflow-hidden border-zinc-500 w-full bg-white z-50"`}
    >
      {showModal ? <HamburgerModal /> : ""}
      <div className="lg:hidden xs:flex sm:flex">
        <button
          type="button"
          onClick={() => setShowModal(!showModal)}
          className="relative max-w-7 inline-flex items-center text-sm font-medium justify-center text-center hover:scale-110 transition-all duration-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {showModal ? (
            <RxCross2 className="text-3xl text-[#15b7b9]"></RxCross2>
          ) : (
            <RxHamburgerMenu className="text-3xl text-[#15b7b9]"></RxHamburgerMenu>
          )}
        </button>
      </div>
      <div className="flex max-w-[389px] xs:justify-center sm:justify-center lg:justify-end">
        <Image
          onClick={() => router.push("/")}
          alt="Logo Image"
          className="hover:cursor-pointer w-2/3"
          src={Logo}
        ></Image>
      </div>
      <ul className="xs:hidden sm:hidden lg:flex lg:col-span-3 tracking-tight text-zinc-800 text-sm px-20 flex-row max-w-2xl mr-auto w-full items-center justify-between">
        <li>
          <Link className="hover:underline decoration-2" href={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link className="hover:underline decoration-2" href={"/shop"}>
            Shop
          </Link>
        </li>
        <li>
          <Link className="hover:underline decoration-2" href={"/discount"}>
            Discounts
          </Link>
        </li>
        <li>
          <Link className="hover:underline decoration-2" href={"/contact"}>
            Contact
          </Link>
        </li>
        <li>
          <Link className="hover:underline decoration-2" href={"/blog"}>
            Blog
          </Link>
        </li>
        {/* <li>
          <Link className="hover:underline decoration-2" href={"/"}>Register/Sign In</Link>
        </li> */}
      </ul>
      <div className="flex">
        <Link
          type="button"
          href={"/cart"}
          className="relative max-w-7 inline-flex items-center text-sm font-medium justify-center text-center hover:scale-110 transition-all duration-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
