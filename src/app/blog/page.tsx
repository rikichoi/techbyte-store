"use client";
import React from "react";
import VrImage from "@/images/medium-shot-man-holding-controllers.webp";
import PhoneImage from "@/images/mobile-phone-cases-mockup-product-showcase.webp";
import StemImage from "@/images/close-up-hand-holding-smartphone.webp";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Blog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedBlog = searchParams.get("id");

  if (selectedBlog === "Best VR Headset") {
    return (
      <div className="pt-36 pb-24 px-52 font-poppins gap-8 flex flex-col">
        <button
          onClick={() => router.back()}
          className="border-2 bg-black border-black hover:text-black transition-all duration-200 hover:bg-white text-white w-fit p-2 flex rounded-xl"
        >
          Return
        </button>
        <div className="group flex flex-col items-center">
          <div className=" overflow-hidden h-min mb-5">
            <Image
              alt="Vr Headset Image"
              className="max-h-[60vh] object-cover  -z-10 "
              src={VrImage}
            ></Image>
          </div>
          <h2 className=" text-2xl">Best VR Headset</h2>
          <h3 className="text-sm font-light">Febuary 24, 2024</h3>
          <p className="py-2 font-light">
            The best new VR gaming headset experience for PlayStation
          </p>
        </div>
      </div>
    );
  }
  if (selectedBlog === "Community Partnership Series") {
    return (
      <div className="pt-36 pb-24 px-52 font-poppins gap-8 flex flex-col">
        <button
          onClick={() => router.back()}
          className="border-2 bg-black border-black hover:text-black transition-all duration-200 hover:bg-white text-white w-fit p-2 flex rounded-xl"
        >
          Return
        </button>
        <div className="group flex flex-col items-center">
          <div className=" overflow-hidden h-min mb-5">
            <Image
              alt="STEM Image"
              className="max-h-[60vh] object-cover  -z-10 "
              src={StemImage}
            ></Image>
          </div>
          <h2 className=" text-2xl">Community Partnership Series</h2>
          <h3 className="text-sm font-light">Febuary 24, 2024</h3>
          <p className="py-2 font-light">
            Teaming up with local support organisations to create STEM
            opportunities
          </p>
        </div>
      </div>
    );
  }
  if (selectedBlog === "Save Battery on iOS 16") {
    return (
      <div className="pt-36 pb-24 px-52 font-poppins gap-8 flex flex-col">
        <button
          onClick={() => router.back()}
          className="border-2 bg-black border-black hover:text-black transition-all duration-200 hover:bg-white text-white w-fit p-2 flex rounded-xl"
        >
          Return
        </button>
        <div className="group flex flex-col items-center">
          <div className=" overflow-hidden h-min mb-5">
            <Image
              alt="Iphone Image"
              className="max-h-[60vh] object-cover -z-10 "
              src={PhoneImage}
            ></Image>
          </div>
          <h2 className=" text-2xl">Save Battery on iOS 16</h2>
          <h3 className="text-sm font-light">Febuary 24, 2024</h3>
          <p className="py-2 font-light">
            Disable these 2 iOS 16 features to save on battery life
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-36 pb-24 px-52 font-poppins gap-8 flex flex-col">
      <h1 className="text-4xl">Blogs</h1>
      <button
        onClick={() => router.push(`${pathname}?id=Best VR Headset`)}
        className="group flex flex-col items-center"
      >
        <div className=" overflow-hidden h-min mb-5">
          <Image
            alt="Vr Headset Image"
            className="max-h-[60vh] object-cover group-hover:scale-105 transition-all duration-300 -z-10 "
            src={VrImage}
          ></Image>
        </div>
        <h2 className="group-hover:underline text-2xl">Best VR Headset</h2>
        <h3 className="text-sm font-light">Febuary 24, 2024</h3>
        <p className="py-2 font-light">
          The best new VR gaming headset experience for PlayStation
        </p>
      </button>
      <div className="gap-3 grid grid-cols-2 items-center">
        <div
          onClick={() =>
            router.push(`${pathname}?id=Community Partnership Series`)
          }
          className="hover:cursor-pointer group h-full"
        >
          <div className=" overflow-hidden h-min mb-5">
            <Image
              alt="STEM Image"
              className="max-h-[42vh] object-cover group-hover:scale-105 transition-all duration-300 -z-10"
              src={StemImage}
            ></Image>
          </div>
          <h2 className="group-hover:underline text-2xl">
            Community Partnership Series
          </h2>
          <h3 className="text-sm font-light">Febuary 24, 2024</h3>
          <p className="py-2 font-light">
            Teaming up with local support organisations to create STEM
            opportunities
          </p>
        </div>
        <div
          onClick={() => router.push(`${pathname}?id=Save Battery on iOS 16`)}
          className="hover:cursor-pointer group h-full"
        >
          <div className=" overflow-hidden h-min mb-5">
            <Image
              alt="Iphone Image"
              className="max-h-[42vh] object-cover group-hover:scale-105 transition-all duration-300 -z-10"
              src={PhoneImage}
            ></Image>
          </div>
          <h2 className="group-hover:underline text-2xl">
            Save Battery on iOS 16
          </h2>
          <h3 className="text-sm font-light">Febuary 24, 2024</h3>
          <p className="py-2 font-light">
            Disable these 2 iOS 16 features to save on battery life
          </p>
        </div>
      </div>
    </div>
  );
}
