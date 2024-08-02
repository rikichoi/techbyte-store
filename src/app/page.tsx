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

export default function Home() {
  const { items, postItem } = useContext(itemContext);
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

  const Catalogue = [
    {
      name: "Items Up To 50% Off",
      bgImage: "bg-[url('../images/catalogue-bg1.png')]",
    },
    {
      name: "Pre-Built Systems",
      bgImage: "bg-[url('../images/catalogue-bg2.png')]",
    },
  ];

  const Details = [
    {
      name: "FREE DELIVERY",
      icon: <GiReceiveMoney className="text-3xl" />,
      detail: "For all order over $100",
    },
    {
      name: "30 DAYS RETURN",
      icon: <FaMoneyBill className="text-3xl" />,
      detail: "If goods have problems",
    },
    {
      name: "SECURE PAYMENT",
      icon: <FaHeadset className="text-3xl" />,
      detail: "100% secure payments",
    },
    {
      name: "24/7 SUPPORT",
      icon: <FaUndoAlt className="text-3xl" />,
      detail: "Dedicated support",
    },
  ];

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setItemData({ ...itemData, [e.target.name]: base64 });
  };

  const handleChange = async (e: any) => {
    if (e.target.type == "number") {
      setItemData({ ...itemData, [e.target.name]: e.target.valueAsNumber });
    }
    if (e.target.type == "float") {
      setItemData({ ...itemData, [e.target.name]: e.target.valueAsNumber });
    }
    if (e.target.type == "text") {
      setItemData({ ...itemData, [e.target.name]: e.target.value });
    }
    if (e.target.type == "radio") {
      setItemData({
        ...itemData,
        [e.target.name]: Boolean(parseInt(e.target.value)),
      });
    }
  };

  function convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    postItem(itemData);
    console.log("Uploaded");
  };

  return (
    <main className="h-full ">
      <div id="home" className="min-h-[100vh] pt-[8vh] overflow-hidden">
        <div className="absolute inset-0 -z-10 max-h-[100vh] w-full bg-blue-600 bg-[radial-gradient(#e5e7eb_0.1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative top-0 -z-10 h-full w-full bg-white"></div>
        <div className="w-full min-h-[100vh] gap-x-20 grid grid-cols-2">
          <div className="flex items-center font-poppins text-white justify-end">
            <div className="flex gap-y-7 flex-col items-center">
              <h3 className="text-sm font-light">
                DISCOVER LATEST DISCOUNT TECH PRODUCTS
              </h3>
              <h1 className="text-5xl">Spring Sales 2024</h1>
              <button
                onClick={()=>console.log(items)}
                className="bg-blue-500 py-4 px-6 border-2 border-black hover:border-white transition-all duration-200"
              >
                SHOP NOW
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <div className="grid grid-cols-2 h-2/3 w-2/3 gap-5">
              <div className="grid grid-rows-2 gap-5">
                <div className="bg-[url('../images/home-bg1.jpg')] h-full w-full rounded-2xl bg-cover bg-center"></div>
                <div className="bg-[url('../images/home-bg2.jpg')] h-full w-full rounded-2xl bg-cover bg-center"></div>
              </div>
              <div className="grid grid-rows-2 gap-5">
                <div className="bg-[url('../images/home-bg3.jpg')] h-full w-full rounded-2xl bg-cover bg-center"></div>
                <div className="bg-[url('../images/home-bg4.jpg')] h-full w-full rounded-2xl bg-cover bg-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="featured"
        className="min-h-[100vh] px-48 flex flex-col gap-3 font-poppins items-center justify-start"
      >
        <h2 className="text-4xl">Featured Products</h2>
        <h3 className="text-sm font-light">
          FREE DELIVERY FROM $60 AND EASY RETURNS
        </h3>
        <div className="grid gap-3 pb-16 grid-cols-4">
          {items.items.filter((item:any)=>item.sale == true).slice(0, 4).map((item: any) => (
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
            />
          ))}
        </div>
        <button className="text-white bg-zinc-900 py-4 px-8 hover:shadow-2xl transition-all duration-200">
          View all
        </button>
      </div>

      <div className="min-h-[100vh] font-poppins pb-[8vh] gap-3 px-48 grid grid-cols-2">
        {Catalogue.map((item, index) => (
          <div key={index} className="bg-gray-100 w-full h-4/5">
            <div
              className={`${item.bgImage} h-full w-full bg-cover bg-center`}
            ></div>
            <div className="bg-gray-100 py-8 space-y-6 px-5">
              <h3 className="w-full">{item.name}</h3>
              <button className="text-black tracking-wide font-light flex flex-row hover:cursor-not-allowed items-center">
                SHOP NOW <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="min-h-[100vh] font-poppins px-48 gap-3 grid grid-cols-7">
        <div className="col-span-5 bg-[url('../images/build-bg1.jpg')] h-full w-full bg-cover bg-center"></div>
        <div className="col-span-2 max-h-[100vh] flex gap-10 flex-col justify-center items-start px-10">
          <h1 className="text-5xl"> Hunt For Your Next Build </h1>
          <button className="text-white bg-zinc-900 py-4 px-8 hover:shadow-2xl transition-all duration-200">
            Click Here
          </button>
        </div>
      </div>

      <div
        id="popular"
        className="min-h-[100vh] py-[8vh] px-48 flex flex-col gap-3 font-poppins items-center justify-start"
      >
        <h2 className="text-4xl">Popular Products</h2>
        <h3 className="text-sm font-light">
          FREE DELIVERY FROM $60 AND EASY RETURNS
        </h3>
        <div className="grid gap-3 pb-5 grid-cols-4">
          {items.items?.slice(4, 8).map((item: any) => (
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
            />
          ))}
        </div>
        <button className="text-white bg-zinc-900 py-4 px-8 hover:shadow-2xl transition-all duration-200">
          View all
        </button>
      </div>

      <div
        id="blog"
        className="min-h-[100vh] py-[8vh] px-48 flex flex-col gap-10 font-poppins items-center justify-start"
      >
        <h2 className="text-4xl">Our Latest Blogs</h2>
        <h3 className="text-sm font-light">Trending Tech News</h3>
        <div className="grid gap-3 pb-5 grid-cols-3">
          {items.items?.slice(0, 3).map((item: any) => (
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
            />
          ))}
        </div>
      </div>

      <div
        id="details"
        className="min-h-[20vh] py-[8vh] px-48 flex flex-row gap-10 font-poppins items-center justify-center"
      >
        <div className="grid gap-3 pb-5 grid-cols-4 w-full">
          {Details.map((item, index) => (
            <div key={index} className="grid items-center grid-cols-5">
              {item.icon}
              <div className="col-span-4 space-y-2">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="text-sm font-light">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => console.log(itemData)}
        className="w-20 h-12 bg-green-500 "
      >
        Log
      </button>
      <div className="App">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>
            True
            <input
              className="border-2"
              type="radio"
              name="sale"
              value={1}
              onChange={handleChange}
            />
          </label>
          <label>
            False
            <input
              className="border-2"
              type="radio"
              name="sale"
              value={0}
              onChange={handleChange}
            />
          </label>
          <input
            placeholder="price"
            className="border-2"
            type="float"
            name="price"
            onChange={handleChange}
          />
          <input
            placeholder="productName"
            className="border-2"
            type="text"
            name="productName"
            onChange={handleChange}
          />
          <input
            placeholder="type"
            className="border-2"
            type="text"
            name="type"
            onChange={handleChange}
          />
          <input
            placeholder="stock"
            className="border-2"
            type="number"
            name="stock"
            onChange={handleChange}
          />
          <input
            placeholder="description"
            className="border-2"
            type="text"
            name="description"
            onChange={handleChange}
          />
          <input
            placeholder="brand"
            className="border-2"
            type="text"
            name="brand"
            onChange={handleChange}
          />
          <input
            placeholder="discount"
            className="border-2"
            type="float"
            name="discount"
            onChange={handleChange}
          />
          <input
            type="file"
            name="image"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
