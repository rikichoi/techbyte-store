"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { itemContext } from "@/lib/context/item-context";
import { Button } from "@/components/ui/button";
import { ItemCard } from "../components/ItemCard";
import { cartContext } from "@/lib/context/cart-context";

export default function Product() {
  const { cart, editCart, getCart } = useContext(cartContext);
  const { items } = useContext(itemContext);
  const searchParams = useSearchParams();
  const search = searchParams.get("name");
  const [itemData, setItemData] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [cartItemData, setCartItemData] = useState([]);

  useEffect(() => {
    if (cart.carts) {
      setCartItemData(cart.carts[0].items);
    }
    if (!cart.carts) {
      return;
    }
  }, [cart]);

  useEffect(() => {
    const filterItemData = () => {
      setItemData(items.items.filter((item) => item.productName == search));
    };
    filterItemData();
  }, [items]);

  const addQuantity = async () => {
    setItemQuantity((prevstate) => ++prevstate);
  };

  const removeQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity((prevstate) => --prevstate);
    } else {
      return;
    }
  };

  const handleFocusChange = (e) => {
    if (!isNaN(e.target.valueAsNumber)) {
      setItemQuantity(e.target.valueAsNumber);
    }
    if (isNaN(e.target.valueAsNumber)) {
      return;
    }
  };

  const addItemHandler = async () => {
    if (cartItemData.some((e) => e.name === itemData[0].productName)) {
      console.log("this item already exists in cart")
    } else {
      setCartItemData(
        cartItemData.push({
          name: itemData[0].productName,
          price: itemData[0].price,
          quantity: itemQuantity,
        })
      );
      await editCart(cart.carts[0]._id, { newItems: cartItemData });
      await getCart();
    }
  };

  return (
    <div className="px-44 font-poppins pt-40 flex flex-col">
      <div className="grid grid-cols-5 max-h-screen">
        <div className="col-span-3 max-h-screen">
          {itemData[0] ? (
            <img
              className="sticky border-2 -z-10 top-20 max-h-[80vh] h-full max-w-[40vw]"
              src={itemData[0].image}
            ></img>
          ) : (
            ""
          )}
        </div>

        {itemData[0] ? (
          <div className="grid grid-rows-5 col-span-2 ">
            <div className="flex flex-col gap-5">
              <h3 className="text-sm text-muted-foreground">
                {itemData[0].brand}
              </h3>
              <h1 className="text-4xl">{itemData[0].productName}</h1>
              <div className="text-base flex items-center flex-row gap-5">
                <p className={itemData[0].sale == true ? "line-through" : ""}>
                  {" "}
                  ${itemData[0].price.toFixed(2)}
                </p>
                {itemData[0].sale == true ? (
                  <p className="text-xl"> ${itemData[0].discount.toFixed(2)}</p>
                ) : (
                  ""
                )}
                {itemData[0].sale == true ? (
                  <div className="right-5 mt-2 bg-[#334fb4] bg-opacity-90 rounded-lg text-white flex px-4 text-sm py-1 ml-auto justify-center w-1/3 ">
                    Sale
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="pt-3 flex flex-col gap-6">
              <h3 className="">Quantity</h3>
              <div className="">
                <button
                  onClick={() => removeQuantity()}
                  className="border-2 max-w-12 w-full"
                >
                  -
                </button>
                <input
                  onChange={(e) => handleFocusChange(e)}
                  value={itemQuantity}
                  type="number"
                  className="[appearance:textfield] focus:scale-105 border-2 max-w-20 text-center"
                ></input>
                <button
                  onClick={() => addQuantity()}
                  className="border-2 max-w-12 w-full"
                >
                  +
                </button>
              </div>
              <Button onClick={() => addItemHandler()} className="w-full">
                Add to cart
              </Button>
            </div>
            <div className="row-span-3">{itemData[0].description}</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        id="popular"
        className="min-h-[100vh] py-[8vh] flex flex-col gap-3 font-poppins items-center justify-start"
      >
        <h2 className="text-4xl">You may also like</h2>
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
    </div>
  );
}
