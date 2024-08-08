"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ItemContext } from "@/lib/context/item-context";
import { Button } from "@/components/ui/button";
import { ItemCard } from "../components/ItemCard";
import { CartContext } from "@/lib/context/cart-context";
import Link from "next/link";
import { toast } from "react-toastify";

type CartItems = {
  name: string;
  quantity: number;
  price: number;
};

type Item = {
  price: number;
  description: Array<string>;
  image: string;
  type: string;
  stock: number;
  productName: string;
  brand: string;
  id: string;
  sale: boolean;
  discount: number;
  createdAt: string;
};

export default function Product() {
  const cartContext = useContext(CartContext);
  const itemContext = useContext(ItemContext);
  const searchParams = useSearchParams();
  const search = searchParams.get("name");
  const [itemData, setItemData] = useState<Item[]>([]);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [cartItemData, setCartItemData] = useState<CartItems[]>([]);

  useEffect(() => {
    if (cartContext && cartContext.cart) {
      setCartItemData(cartContext.cart.items);
    }
    if (!cartContext) {
      return;
    }
  }, []);

  useEffect(() => {
    if (itemContext && itemContext.items) {
      setItemData(
        itemContext.items.filter((item) => item.productName == search)
      );
    }
    if (!itemContext) {
      return;
    }
  }, [itemContext.items]);

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

  const handleFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(e.target.valueAsNumber) && e.target.valueAsNumber > 0) {
      setItemQuantity(e.target.valueAsNumber);
    }
    if (isNaN(e.target.valueAsNumber)) {
      return;
    }
  };

  const addItemHandler = async () => {
    if (cartItemData.some((e) => e.name === itemData[0].productName)) {
      toast.error("Item already in cart");
    } else {
      cartItemData.push({
        name: itemData[0].productName,
        price: itemData[0].price,
        quantity: itemQuantity,
      });
      if (
        cartContext &&
        cartContext.cart &&
        cartContext.editCart &&
        cartContext.getCart
      ) {
        await cartContext.editCart(cartContext.cart._id, {
          newItems: cartItemData,
        });
        await cartContext.getCart();
      }
    }
  };

  return (
    <div className="xs:px-5 sm:px-12 lg:px-44 font-poppins pt-40 flex flex-col">
      <div className="grid sm:grid-cols-1 lg:grid-cols-5 xs:max-h-[120vh] sm:max-h-[140vh] lg:max-h-[120vh]">
        <div className="col-span-3 flex xs:justify-center xs:items-center sm:justify-center sm:items-center lg:justify-center lg:items-start max-h-screen">
          {itemData[0] ? (
            <img
            alt="Product image"
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
              <h1 className="xs:text-2xl sm:text-2xl lg:text-4xl">
                {itemData[0].productName}
              </h1>
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
                  className="border-2 py-2  max-w-12 w-full"
                >
                  -
                </button>
                <input
                  onChange={(e) => handleFocusChange(e)}
                  value={itemQuantity}
                  type="number"
                  className="[appearance:textfield] py-2 focus:scale-105 border-2 max-w-20 text-center"
                ></input>
                <button
                  onClick={() => addQuantity()}
                  className="border-2 py-2  max-w-12 w-full"
                >
                  +
                </button>
              </div>
              <Button onClick={() => addItemHandler()} className="w-full">
                Add to cart
              </Button>
            </div>
            <div className="row-span-3 flex xs:text-lg sm:text-lg lg:text-lg ">
              <ul className="list-disc space-y-2 pl-4 pt-5">
                {itemData[0].description.map((item:string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        id="popular"
        className="min-h-[100vh] pb-[8vh] flex flex-col gap-3 font-poppins items-center justify-start"
      >
        <h2 className="xs:text-2xl sm:text-2xl lg:text-4xl">
          You may also like
        </h2>
        <h3 className="text-sm font-light">
          FREE DELIVERY FROM $60 AND EASY RETURNS
        </h3>
        <div className="grid gap-3 pb-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {itemContext.items?.slice(4, 8).map((item: any) => (
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
          ))}
        </div>
        <Link
          href={"/shop"}
          className="text-white bg-zinc-900 hover:text-black hover:bg-white border-2 hover:border-black border-zinc-900 hover:shadow-2xl  py-4 px-8 transition-all duration-200"
        >
          View all
        </Link>
      </div>
    </div>
  );
}
