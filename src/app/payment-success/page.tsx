import React from "react";

export default function page({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <main className="flex min-h-screen flex-col gap-y-4 items-center justify-center bg-stripe-gradient">
        <h1 className=" text-5xl font-extrabold">Thank You!</h1>
        <h2 className=" text-2xl ">You successfully sent ${amount}</h2>
    </main>
  );
}
