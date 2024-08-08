"use client";
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "@/lib/context/cart-context";
import { ItemContext } from "@/lib/context/item-context";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { RiDeleteBin6Line } from "react-icons/ri";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type CartItems = {
  name: string;
  quantity: number;
  price: number;
};

export default function Cart() {
  const itemContext = useContext(ItemContext);
  const cartContext = useContext(CartContext);
  const [cartItemData, setCartItemData] = useState<CartItems[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDisplayAmount, setTotalDisplayAmount] = useState(0);
  const [updatedCartItemData, setUpdatedCartItemData] = useState([]);
  const [cartItemQuantity, setCartItemQuantity] = useState([]);

  useEffect(() => {
    if (cartContext && cartContext.cart) {
      setCartItemData(cartContext.cart.items);
    }
    if (!cartContext) {
      return;
    }
  }, [cartContext]);

  const updateTotal = () => {
    let total = 0;
    for (var i = 0, len = cartItemData.length; i < len; i++) {
      total += cartItemData[i].price;
    }
    setTotalDisplayAmount(total);
    setTotalAmount(Math.round(total * 100));
  };

  useEffect(() => {
    if (cartItemData) {
      updateTotal();
    }
    if (!cartItemData) {
      return;
    }
  }, [cartItemData]);

  const addQuantity = async (productName: string) => {
    let cartIndex = cartItemData.findIndex((obj) => obj.name == productName);
    let itemIndex;
    if (itemContext && itemContext.items) {
      itemIndex = itemContext.items.findIndex(
        (obj) => obj.productName == productName
      );

      cartItemData[cartIndex].quantity += 1;
      cartItemData[cartIndex].price = Number(
        (
          cartItemData[cartIndex].quantity * itemContext.items[itemIndex].price
        ).toFixed(2)
      );
    }
    if (
      cartContext &&
      cartContext.editCart &&
      cartContext.getCart &&
      cartContext.cart
    ) {
      await cartContext.editCart(cartContext.cart._id, {
        newItems: cartItemData,
      });
      await cartContext.getCart();
    }
    updateTotal();
  };

  const removeQuantity = async (productName: string) => {
    let cartIndex = cartItemData.findIndex((obj) => obj.name == productName);
    let itemIndex;
    if (itemContext && itemContext.items) {
      itemIndex = itemContext.items.findIndex(
        (obj) => obj.productName == productName
      );
      if (cartItemData[cartIndex].quantity > 1) {
        cartItemData[cartIndex].quantity -= 1;
        cartItemData[cartIndex].price = Number(
          (
            cartItemData[cartIndex].quantity *
            itemContext.items[itemIndex].price
          ).toFixed(2)
        );
      }
      if (
        cartContext &&
        cartContext.editCart &&
        cartContext.getCart &&
        cartContext.cart
      ) {
        await cartContext.editCart(cartContext.cart._id, {
          newItems: cartItemData,
        });
        await cartContext.getCart();
        updateTotal();
      }
    }
    if (cartItemData[cartIndex].quantity <= 0) {
      return;
    }
  };

  const removeItem = async (productName: string) => {
    let cartIndex = cartItemData.findIndex((obj) => obj.name == productName);
    cartItemData.splice(cartIndex, 1);
    if (
      cartContext &&
      cartContext.editCart &&
      cartContext.getCart &&
      cartContext.cart
    ) {
      await cartContext.editCart(cartContext.cart._id, {
        newItems: cartItemData,
      });
      await cartContext.getCart();
      updateTotal();
    }
  };

  const handleFocusChange = async (
    productName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let cartIndex = cartItemData.findIndex((obj) => obj.name == productName);
    let itemIndex;
    if (itemContext && itemContext.items) {
      itemIndex = itemContext.items.findIndex(
        (obj) => obj.productName == productName
      );
      if (!isNaN(e.target.valueAsNumber)) {
        cartItemData[cartIndex].quantity = e.target.valueAsNumber;
        cartItemData[cartIndex].price = Number(
          (
            cartItemData[cartIndex].quantity *
            itemContext.items[itemIndex].price
          ).toFixed(2)
        );
        if (
          cartContext &&
          cartContext.editCart &&
          cartContext.getCart &&
          cartContext.cart
        ) {
          await cartContext.editCart(cartContext.cart._id, {
            newItems: cartItemData,
          });
          await cartContext.getCart();
          updateTotal();
        }
      }
    }
    if (isNaN(e.target.valueAsNumber)) {
      return;
    }
  };

  return (
    <div className="pt-44 lg:px-52 sm:px-4 xs:px-4 font-poppins space-y-12">
      <h1 className="text-5xl">Your cart</h1>

      <div className="flex flex-col">
        <div className="grid pb-5 grid-cols-5">
          <div className="col-span-2 text-xs font-light">PRODUCT</div>
          <div className="col-span-2 text-xs font-light">QUANTITY</div>
          <div className="text-xs font-light">TOTAL</div>
        </div>
        {cartItemData.map((item, index) => (
          <div
            key={index}
            className="grid items-center grid-cols-5 border-b-2 py-5"
          >
            <div className="col-span-2">
              <p>{item.name}</p>
            </div>
            <div className="flex col-span-2">
              <button
                onClick={() => removeQuantity(item.name)}
                className="border-2 max-w-12 w-full"
              >
                -
              </button>
              <input
                onChange={(e) => handleFocusChange(item.name, e)}
                value={item.quantity}
                type="number"
                className="[appearance:textfield] focus:scale-105 border-2 max-w-20 text-center"
              ></input>
              <button
                onClick={() => addQuantity(item.name)}
                className="border-2 max-w-12 w-full"
              >
                +
              </button>
              <RiDeleteBin6Line
                onClick={() => removeItem(item.name)}
                className="text-5xl ml-5 hover:cursor-pointer hover:scale-105"
              />
            </div>
            <div className="">${item.price.toLocaleString()}</div>
          </div>
        ))}
        <div>
          <p className="font-bold text-lg py-10">
            Total Amount: ${totalDisplayAmount.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center sm:gap-4 xs:gap-4 lg:gap-28 justify-center flex-row pb-10">
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-center text-orange-500">
              Demo Payment Details
            </p>
            <p className=" text-center font-semibold">Card numbers:</p>
            <ul className="list-disc">
              <li>4242 4242 4242 4242</li>
              <li>4000 0566 5566 5556</li>
              <li>5555 5555 5555 4444</li>
            </ul>
            <p className=" text-center">
              <span className="font-semibold">Expiration date:</span> Any future
              date{" "}
            </p>
            <p className=" text-center">
              <span className="font-semibold">Security code:</span> Any 3 digits{" "}
            </p>
            <p className=" text-center">
              <span className="font-semibold">Country:</span> Any Country{" "}
            </p>
          </div>
          {totalAmount == 0 ? (
            ""
          ) : (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: totalAmount,
                appearance: { theme: "stripe" },
                currency: "usd",
              }}
            >
              <CheckoutForm
                amount={totalAmount}
                displayAmount={totalDisplayAmount}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}
