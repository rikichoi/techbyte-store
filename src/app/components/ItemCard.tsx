"use client";
import * as React from "react";
import { useState, useEffect, useContext, cache, Key } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/lib/context/cart-context";
import { get } from "http";

type ItemCardProps = {
  price: number;
  description: string;
  image: string;
  type: string;
  stock: number;
  productName: string;
  brand: string;
  id: string;
  sale: boolean;
  discount: number;
};

export function ItemCard(props: ItemCardProps) {
  const { cart, editCart, getCart } = useContext(cartContext);
  const [cartItemData, setCartItemData] = useState([]);

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (cart.carts) {
      setCartItemData(cart.carts[0].items);
    }
    if (!cart.carts) {
      return;
    }
  }, [cart]);

  const addItemHandler = async () => {
    if (cartItemData.some((e) => e.name === props.productName)) {
      return;
    } else {
      setCartItemData(
        cartItemData.push({
          name: props.productName,
          price: props.price,
          quantity: 1,
        })
      );
      await editCart(cart.carts[0]._id, { newItems: cartItemData });
      getCart();
    }
  };

  return (
    <Card className="grid grid-rows-4 max-h-[64vh]" {...props}>
      <CardHeader className="row-span-3 w-full">
        <img
          className=" flex flex-grow"
          src={props.image}
          alt={props.image}
        ></img>
        {props.sale == true ? (
          <div className="right-5 mt-2 bg-[#334fb4] bg-opacity-90 rounded-lg text-white flex px-4 text-sm py-1 ml-auto justify-center w-1/3 ">
            Sale
          </div>
        ) : (
          ""
        )}
      </CardHeader>
      <CardContent className="">
        <div>
          <div
            key={props.id}
            className="mb-4 grid grid-cols-[1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <div className="grid grid-rows-2">
              <p className="overflow-hidden text-sm font-medium leading-none">
                {props.productName}
              </p>
              <div>
                <p className="text-sm text-muted-foreground">{props.brand}</p>
                <div className="text-sm flex items-center flex-row gap-5">
                  <p className={props.sale == true ? "line-through" : ""}>
                    {" "}
                    ${props.price.toFixed(2)}
                  </p>
                  {props.sale == true ? (
                    <p className="text-base"> ${props.discount.toFixed(2)}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="">
        <Button onClick={() => addItemHandler()} className="w-full">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
