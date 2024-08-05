"use client";
import Image from "next/image";
import { useState, useEffect, useContext, cache, Key } from "react";
import { ItemCard } from "@/app/components/ItemCard";
import { itemContext } from "@/lib/context/item-context";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { FaMoneyBill } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";

export default function Discount() {
  const { items, postItem, getItems } = useContext(itemContext);
  const InitialState = {
    price: 0,
    description: "",
    image: "",
    type: "",
    stock: 0,
    productName: "",
    brand: "",
    sale: Boolean(false),
    discount: 0,
  };
  const [itemData, setItemData] = useState(InitialState);
  const [sortFilter, setSortFilter] = useState(
    "(a, b) => new Date(b.createdAt) - new Date(a.createdAt)"
  );
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  const sortOptions = [
    {
      type: "Newest",
      value: "(a, b) => new Date(b.createdAt) - new Date(a.createdAt)",
    },
    {
      type: "Oldest",
      value: "(a, b) => new Date(a.createdAt) - new Date(b.createdAt)",
    },
    {
      type: "Highest Price",
      value: "(a, b) => b.price - a.price",
    },
    {
      type: "Lowest Price",
      value: "(a, b) => a.price - b.price",
    },
  ];

  const categoryOptions = [
    {
      type: "Any Category",
      value: "",
    },
    {
      type: "Case",
      value: "Case",
    },
    {
      type: "Processor",
      value: "Processor",
    },
    {
      type: "Power Supply",
      value: "Power Supply",
    },
    {
      type: "Graphics Card",
      value: "Graphics Card",
    },
    {
      type: "Motherboard",
      value: "Motherboard",
    },
    {
      type: "Memory",
      value: "Memory",
    },
    {
      type: "Core",
      value: "Core",
    },
  ];

  const brandOptions = [
    {
      type: "Any Brand",
      value: "",
    },
    {
      type: "INTEL",
      value: "INTEL",
    },
    {
      type: "NVIDIA",
      value: "NVIDIA",
    },
    {
      type: "AMD",
      value: "AMD",
    },
    {
      type: "ASUS",
      value: "ASUS",
    },
    {
      type: "CORSAIR",
      value: "CORSAIR",
    },
    {
      type: "FRACTAL DESIGN",
      value: "FRACTAL DESIGN",
    },
    {
      type: "BE QUIET!",
      value: "BE QUIET!",
    },
    {
      type: "MSI",
      value: "MSI",
    },
    {
      type: "NZXT",
      value: "NZXT",
    },
  ];

  return (
    <main className="h-full font-poppins pt-[18vh]">
      <div
        id="featured"
        className="min-h-[100vh] xs:px-4 sm:px-4 lg:px-48 flex flex-col gap-3 font-poppins "
      >
        <h2 className="xs:text-3xl text-4xl">Featured Discounts</h2>
        <h3 className="xs:text-base text-xl font-light pb-10">
          Tech products going on sale.
        </h3>
        <div className="grid xs:gap-2 grid-cols-2 xs:grid-cols-1">
          <div className="flex flex-row items-center">
            <h4 className="pr-2 text-sm font-light">Filter:</h4>
            <select
              id="categoryOptions"
              defaultValue={"Any Category"}
              className="xs:text-xs sm:text-xs text-base xxxs:text-sm xxs:text-sm bg-white p-1 border-2 hover:cursor-pointer rounded-lg"
              name="categoryOptions"
            >
              {categoryOptions.map((options) => (
                <option
                  onClick={() => setCategoryFilter(options.value)}
                  label={options.type}
                  key={options.type}
                  value={options.value}
                ></option>
              ))}
            </select>
            <select
              id="brandOptions"
              defaultValue={"Any Brand"}
              className="xs:text-xs sm:text-xs text-base ml-2 bg-white p-1 border-2 hover:cursor-pointer rounded-lg"
              name="brandOptions"
            >
              {brandOptions.map((options) => (
                <option
                  onClick={() => setBrandFilter(options.value)}
                  label={options.type}
                  key={options.type}
                  value={options.value}
                ></option>
              ))}
            </select>
          </div>
          <div className="flex flex-row justify-end items-center">
            <h4 className="pr-2 text-sm font-light">Sort By:</h4>
            <select
              id="sortOptions"
              defaultValue={"Newest"}
              className="xs:text-xs sm:text-xs text-base bg-white p-1 border-2 hover:cursor-pointer rounded-lg"
              name="sortOptions"
            >
              {sortOptions.map((options) => (
                <option
                  onClick={() =>
                    setSortFilter(options.value.replace(/^"(.*)"$/, "$1"))
                  }
                  label={options.type}
                  key={options.type}
                  value={options.value}
                ></option>
              ))}
            </select>
            <h4 className="pl-10 xs:pl-0 xs:ml-auto xs:text-end xs:pr-0 pr-2 text-sm font-light">
              {
                items.items?.filter(
                  (item) =>
                    item.sale == true &&
                    item.type.includes(categoryFilter) &&
                    item.brand.includes(brandFilter)
                ).length
              }{" "}
              products
            </h4>
          </div>
        </div>
        <div className="grid gap-3 pb-16 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.items
            ?.filter(
              (item) =>
                item.sale == true &&
                item.type.includes(categoryFilter) &&
                item.brand.includes(brandFilter)
            )
            .sort(eval(sortFilter))
            .map((item: any) => (
              <ItemCard
                key={item._id}
                price={item && item.price && item.price}
                description={item && item.description && item.description}
                image={item && item.image && item.image}
                type={item && item.type && item.type}
                stock={item && item.stock && item.stock}
                productName={item && item.productName && item.productName}
                brand={item && item.brand && item.brand}
                id={item && item._id && item._id}
                sale={item && item.sale && item.sale}
                discount={item && item.discount && item.discount}
                createdAt={item && item.createdAt && item.createdAt}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
