import React from "react";

export default function PaymentSuccess() {
  return (
    <main className="flex min-h-screen flex-col gap-y-4 items-center justify-center bg-stripe-gradient">
        <h1 className=" text-5xl font-extrabold">Thank You!</h1>
        <h2 className=" text-2xl ">Your payment has been processed</h2>
    </main>
  );
}
