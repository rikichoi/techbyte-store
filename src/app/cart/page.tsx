"use client";
import React, { useEffect, useState, useContext } from "react";
import { cartContext } from "@/lib/context/cart-context";
import { itemContext } from "@/lib/context/item-context";

export default function Cart() {
  const { items, postItem } = useContext(itemContext);
  const { cart, editCart, getCart } = useContext(cartContext);
  const [cartItemData, setCartItemData] = useState([]);
  const [updatedCartItemData, setUpdatedCartItemData] = useState([]);
  const [cartItemQuantity, setCartItemQuantity] = useState([]);

  useEffect(() => {
    if (cart.carts) {
      setCartItemData(cart.carts[0].items);
    }
    if (!cart.carts) {
      return;
    }
  }, [cart]);

  const addQuantity = async (productName) => {
    let cartIndex = cartItemData.findIndex((obj) => obj.name == productName);
    let itemIndex = items.items.findIndex(
      (obj) => obj.productName == productName
    );
    cartItemData[cartIndex].quantity += 1;
    cartItemData[cartIndex].price =
      cartItemData[cartIndex].quantity * items.items[itemIndex].price;
    await editCart(cart.carts[0]._id, { newItems: cartItemData });
    getCart();
  };

  const removeQuantity = async (productName) => {
    let cartIndex = cartItemData.findIndex((obj) => obj.name == productName);
    let itemIndex = items.items.findIndex(
      (obj) => obj.productName == productName
    );
    if(cartItemData[cartIndex].quantity >= 1){
      cartItemData[cartIndex].quantity -= 1;
      cartItemData[cartIndex].price =
        cartItemData[cartIndex].quantity * items.items[itemIndex].price;
      await editCart(cart.carts[0]._id, { newItems: cartItemData });
      getCart();
    }
    if(cartItemData[cartIndex].quantity <= 0){
      return;
    }
  };

  const removeItem = async (productName) => {
    let cartIndex = cartItemData.findIndex((obj) => obj.name == productName);
    cartItemData.splice(cartIndex, 1);
    await editCart(cart.carts[0]._id, { newItems: cartItemData });
    getCart();
  };

  const handleFocusChange = async (productName, e) => {
    let cartIndex = cartItemData.findIndex((obj) => obj.name == productName);
    let itemIndex = items.items.findIndex(
      (obj) => obj.productName == productName
    );
    if (!isNaN(e.target.valueAsNumber)) {
      cartItemData[cartIndex].quantity = e.target.valueAsNumber;
      cartItemData[cartIndex].price =
        cartItemData[cartIndex].quantity * items.items[itemIndex].price;
      await editCart(cart.carts[0]._id, { newItems: cartItemData });
      getCart();
    }
    if (isNaN(e.target.valueAsNumber)) {
      return;
    }
  };

  return (
    <div className="pt-44 px-52 space-y-12">
      <h1 className="text-5xl">Your cart</h1>

      <div className="flex flex-col">
        <div className="grid grid-cols-5">
          <div className="col-span-2">PRODUCT</div>
          <div className="col-span-2">QUANTITY</div>
          <div className="">TOTAL</div>
        </div>
        {cartItemData.map((item, index) => (
          <div key={index} className="grid grid-cols-5">
            <div className="col-span-2">
              <p>{item.name}</p>
            </div>
            <div className="flex col-span-2">
              <button
                onClick={() => (removeQuantity(item.name))}
                className="border-2 max-w-12 w-full"
              >
                -
              </button>
              <input
                onChange={(e) => (handleFocusChange(item.name, e))}
                value={item.quantity}
                type="number"
                className="border-2 max-w-20 text-center"
              ></input>
              <button
                onClick={() => (addQuantity(item.name))}
                className="border-2 max-w-12 w-full"
              >
                +
              </button>
              <button
                onClick={() => (removeItem(item.name))}
                className="border-2 w-full"
              >
                REMOVE
              </button>
            </div>
            <div className="">{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
