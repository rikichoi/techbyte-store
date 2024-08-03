import React from "react";

export default function Contact() {
  return (
    <div className="pt-36 px-[20vw]">
      <h1 className="text-4xl pb-10 font-bold">CONTACT</h1>
      <div className="font-poppins font-bold gap-10 flex flex-row items-center justify-center">
        <div className="grid gap-5 w-full sm:grid-cols-1 lg:grid-cols-2">
          <div className="grid grid-rows-3 w-full  gap-3">
            <input
              placeholder="Name"
              className="w-full text-xl border-2 border-zinc-500 py-2 px-2 "
            ></input>
            <input
              placeholder="Email"
              className="w-full text-xl border-2 border-zinc-500 py-2 px-2"
            ></input>
            <input
              placeholder="Subject"
              className="w-full text-xl border-2 border-zinc-500 py-2 px-2"
            ></input>
          </div>
          <div className="grid w-full h-full gap-5">
            <textarea
              placeholder="Message"
              className="w-full h-full text-xl border-2 border-zinc-500 py-2 px-2 "
            ></textarea>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end py-5 items-end">
        <button
          className="bg-cyan-600 hover:bg-cyan-300 hover:text-black transition-all duration-500 text-white font-semibold z-50 py-5 text-center max-w-40 w-full text-xl"
        >
          SEND
        </button>
      </div>
    </div>
  );
}
