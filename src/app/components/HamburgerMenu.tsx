"use client";
import React, { useCallback, useEffect, useState, useContext } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";

export default function HamburgerModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [applyDisabled, setApplyDisabled] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <div className="fixed font-poppins min-h[100vh] min-w-[100vw] h-full backdrop-blur-md mt-[12.7vh] z-50 flex top-0 left-0">
      <div className="h-1/2 w-full grid grid-rows-5 ">
        <Link
          href={"/"}
          className="row-span-1 h-full p-3 border-y-2 border-zinc-800 flex items-center hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <h1 className="flex text-2xl font-semibold text-zinc-700 pl-14">
            Home
          </h1>
        </Link>
        <Link
          href={"/shop"}
          className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center  flex hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <h1 className="flex text-2xl font-semibold text-zinc-700 pl-14">
            Shop
          </h1>
        </Link>
        <Link
          href={"/discount"}
          className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center  flex hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <h1 className="flex text-2xl font-semibold text-zinc-700 pl-14">
            Discounts
          </h1>
        </Link>
        <Link
          href={"/contact"}
          className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center flex hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <h1 className="flex text-2xl font-semibold text-zinc-700 pl-14">
            Contact
          </h1>
        </Link>
        <Link
          href={"/blog"}
          className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center flex hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <h1 className="flex text-2xl font-semibold text-zinc-700 pl-14">
            Blog
          </h1>
        </Link>
      </div>
    </div>
  );
}
