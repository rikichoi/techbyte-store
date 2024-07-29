"use client";
import Image from "next/image";
import { useState, useEffect, cache, Key } from "react";
import { MainCarousel } from "@/app/components/MainCarousel";
import { ItemCard } from "@/app/components/ItemCard";

export default function Home() {
  const [itemList, setItemList] = useState<any>({});
  const InitialState = {
    price: 0,
    description: "",
    image: "",
    type: "",
    stock: 0,
    productName: "",
    brand: "",
  };
  const [itemData, setItemData] = useState(InitialState);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/items/", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return setItemList(await res.json());
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, []);

  const [postImage, setPostImage] = useState({ myFile: "" });

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setItemData({ ...itemData, image: base64 });
  };

  const handleChange = async (e: any) => {
    if(e.target.type == "number"){
      setItemData({ ...itemData, [e.target.name]: e.target.valueAsNumber });
    }
    if(e.target.type == "text"){
      setItemData({ ...itemData, [e.target.name]: e.target.value });
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

  const postItem = async () => {};

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Uploaded");
  };

  return (
    <main className="pt-[14vh] flex flex-col items-center justify-center h-full">
      <button
        onClick={() => console.log(itemData)}
        className="w-20 h-12 bg-green-500 "
      >
        Log
      </button>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input placeholder="number" className="border-2" type="number" name="price" onChange={handleChange} />
          <input placeholder="text" className="border-2" type="text" name="productName" onChange={handleChange} />

          <input
            type="file"
            name="myFile"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
          />

          <h3>Doris Wilder</h3>
          <span>Designer</span>

          <button type="submit">Submit</button>
        </form>
      </div>
      {itemList.items?.map((item: any) => (
        <ItemCard
          key={item._id}
          carouselLength={item && item.length && item.length}
          price={item && item.price && item.price}
          description={item && item.description && item.description}
          image={item && item.image && item.image}
          type={item && item.type && item.type}
          stock={item && item.stock && item.stock}
          productName={item && item.productName && item.productName}
          brand={item && item.brand && item.brand}
          id={item && item._id && item._id}
        />
      ))}
    </main>
  );
}
