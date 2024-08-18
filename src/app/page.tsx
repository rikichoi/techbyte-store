"use client";
import Image from "next/image";
import { useState, useEffect, useContext, cache, Key } from "react";
import { ItemCard } from "@/app/components/ItemCard";
import { ItemContext } from "@/lib/context/item-context";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { FaMoneyBill } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import VrImage from "@/images/medium-shot-man-holding-controllers.webp";
import PhoneImage from "@/images/mobile-phone-cases-mockup-product-showcase.webp";
import StemImage from "@/images/close-up-hand-holding-smartphone.webp";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { navbarContext } from "@/lib/context/navbar-context";


export default function Home() {
  const router = useRouter();
  const itemContext = useContext(ItemContext);
  const { showModal, setShowModal } = useContext(navbarContext);
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
    if (itemContext && itemContext.postItem) {
      itemContext.postItem(itemData);
      console.log("Uploaded");
    }
  };

  return (
    <main className={showModal ? "h-full" : "h-full"}>
      <div id="home" className="min-h-[100vh] pt-[8vh] overflow-hidden">
        <div className="absolute inset-0 -z-10 max-h-[100vh] w-full bg-blue-600 bg-[radial-gradient(#e5e7eb_0.1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative top-0 -z-10 h-full w-full bg-white"></div>
        <div className="w-full min-h-[92vh] gap-x-20 grid xs:grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xs:grid-rows-3 sm:grid-rows-3">
          <div className="flex xs:row-span-1 sm:row-span-1 lg:row-span-3 items-center font-poppins text-white xs:justify-center sm:justify-center lg:justify-end">
            <div className="flex xs:pt-12 sm:pt-12 lg:pt-0 xs:gap-y-2 sm:gap-y-2 lg:gap-y-7 flex-col items-center">
              <h3 className="xs:text-xs sm:text-sm lg:text-sm font-light">
                DISCOVER LATEST DISCOUNT TECH PRODUCTS
              </h3>
              <h1 className="xs:text-3xl sm:text-4xl lg:text-5xl">
                Spring Sales 2024
              </h1>
              <Link
                href={"/shop"}
                className="bg-blue-500 xs:mt-5 sm:mt-5 lg:mt-0 py-4 px-6 border-2 border-black hover:border-white transition-all duration-200"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
          <div className="lg:justify-start xs:row-span-2 sm:row-span-2 lg:row-span-3 xs:justify-center sm:justify-center flex items-center">
            <div className="grid grid-cols-2 xs:h-5/6 sm:h-5/6 xs:w-5/6  sm:w-5/6 lg:h-2/3 lg:w-2/3 gap-5">
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
        className="min-h-[100vh] pt-[12vh] xs:px-5 sm:px-5 lg:px-48 flex flex-col gap-3 font-poppins items-center justify-start"
      >
        <h2 className="xs:text-2xl text-4xl">Featured Products</h2>
        <h3 className="xs:text-xs text-sm font-light">
          FREE DELIVERY FROM $60 AND EASY RETURNS
        </h3>
        <div className="grid gap-3 lg:pb-10 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {itemContext && itemContext.items
            ? itemContext.items
                .filter((item: any) => item.sale == true)
                .slice(0, 4)
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
                ))
            : ""}
        </div>
        <Link
          href={"/shop"}
          className="text-white xs:my-8 sm:my-8 bg-zinc-900 hover:text-black hover:bg-white border-2 hover:border-black border-zinc-900 hover:shadow-2xl  py-4 px-8 transition-all duration-200"
        >
          View all
        </Link>
      </div>

      <div className="min-h-[100vh] font-poppins pb-[8vh] gap-3 xs:px-5 sm:px-5 lg:px-48 grid lg:grid-cols-2 sm:grid-cols-2 xs:grid-rows-2 xs:gap-24">
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

      <div className="min-h-[100vh] font-poppins xs:pt-10 xs:px-5 sm:px-5 lg:px-48 gap-3 grid lg:grid-cols-7 lg:grid-rows-1 sm:grid-rows-5 xs:grid-rows-5">
        <div className="xs:row-span-4 sm:row-span-4 col-span-5 bg-[url('../images/build-bg1.jpg')] h-full w-full bg-cover bg-center"></div>
        <div className="col-span-2 max-h-[100vh] flex gap-10 flex-col justify-center items-start sm:px-0 lg:px-10">
          <h1 className="xs:text-2xl sm:text-2xl lg:text-5xl">
            {" "}
            Hunt For Your Next Build{" "}
          </h1>
          <Link
            href={"/shop"}
            className="text-white bg-zinc-900 py-4 px-8 hover:text-black hover:bg-white border-2 hover:border-black border-zinc-900 hover:shadow-2xl transition-all duration-200"
          >
            Click Here
          </Link>
        </div>
      </div>

      <div
        id="popular"
        className="min-h-[100vh] py-[8vh] xs:px-5 sm:px-5 lg:px-48 flex flex-col gap-3 font-poppins items-center justify-start"
      >
        <h2 className="xs:text-2xl text-4xl">Popular Products</h2>
        <h3 className="xs:text-xs text-sm font-light">
          FREE DELIVERY FROM $60 AND EASY RETURNS
        </h3>
        <div className="grid gap-3 pb-10 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {itemContext && itemContext.items
            ? itemContext.items
                .slice(0, 4)
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
                ))
            : ""}
        </div>
        <Link
          href={"/shop"}
          className="text-white bg-zinc-900 hover:text-black hover:bg-white border-2 hover:border-black border-zinc-900 hover:shadow-2xl py-4 px-8 transition-all duration-200"
        >
          View all
        </Link>
      </div>
      <div
        id="blog"
        className="min-h-[60vh] xs:px-5 sm:px-5 lg:px-48 flex flex-col gap-10 font-poppins items-center justify-start"
      >
        <h2 className="text-4xl">Our Latest Blogs</h2>
        <h3 className="text-sm font-light">Trending Tech News</h3>
        <div className="grid xs:grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 pb-5">
          <div
            onClick={() => router.push("/blog?id=Save Battery on iOS 16")}
            className="hover:cursor-pointer group h-full"
          >
            <div className=" overflow-hidden h-min mb-5">
              <Image
                alt="Vr Headset Image"
                className="h-[33vh] object-cover group-hover:scale-105 transition-all duration-300 -z-10"
                src={VrImage}
              ></Image>
            </div>
            <h2 className="group-hover:underline text-2xl">Best VR Headset</h2>
            <h3 className="text-sm font-light">Febuary 24, 2024</h3>
            <p className="py-2 text-sm font-light">
              The best new VR gaming headset experience for PlayStation
            </p>
          </div>
          <div
            onClick={() => router.push("/blog?id=Save Battery on iOS 16")}
            className="hover:cursor-pointer group h-full"
          >
            <div className=" overflow-hidden h-min mb-5">
              <Image
                alt="STEM Image"
                className="h-[33vh] object-cover group-hover:scale-105 transition-all duration-300 -z-10"
                src={StemImage}
              ></Image>
            </div>
            <h2 className="group-hover:underline text-2xl">
              Community Partnership Series
            </h2>
            <h3 className="text-sm font-light">Febuary 24, 2024</h3>
            <p className="py-2 text-sm font-light">
              Teaming up with local support organisations to create STEM
              opportunities
            </p>
          </div>
          <div
            onClick={() => router.push("/blog?id=Save Battery on iOS 16")}
            className="hover:cursor-pointer group h-full"
          >
            <div className=" overflow-hidden h-min mb-5">
              <Image
                alt="Iphone Image"
                className="h-[33vh] object-cover group-hover:scale-105 transition-all duration-300 -z-10"
                src={PhoneImage}
              ></Image>
            </div>
            <h2 className="group-hover:underline text-2xl">
              Save Battery on iOS 16
            </h2>
            <h3 className="text-sm font-light">Febuary 24, 2024</h3>
            <p className="py-2 text-sm font-light">
              Disable these 2 iOS 16 features to save on battery life
            </p>
          </div>
        </div>
      </div>

      <div
        id="details"
        className="min-h-[20vh] xs:py-[8vh] sm:py-[8vh] lg:py-[14vh] xs:px-5 sm:px-5 lg:px-48 flex flex-row gap-10 font-poppins items-center justify-center"
      >
        <div className="grid gap-3 pb-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
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

      {/* <button
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
      </div> */}
    </main>
  );
}
