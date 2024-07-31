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

export default function Shop() {
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
    <main className="h-full pt-[18vh]">
      <div
        id="products"
        className="min-h-[100vh] px-48 flex flex-col gap-3 font-poppins "
      >
        <h2 className="text-4xl">Products</h2>
        <h3 className="text-sm font-light">
          INSERT FILTERING SYSTEM
        </h3>
        <div className="grid gap-3 pb-16 grid-cols-4">
          {items.items?.map((item: any) => (
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
        <button
          onClick={() => console.log(items)}
          className="text-white bg-zinc-900 py-4 px-8 hover:shadow-2xl transition-all duration-200"
        >
          View all
        </button>
      </div>
    </main>
  );
}
