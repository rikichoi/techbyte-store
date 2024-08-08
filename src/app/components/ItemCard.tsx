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
import { CartContext } from "@/lib/context/cart-context";
import { get } from "http";
import Link from "next/link";
import {toast} from "react-toastify";

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
  createdAt: string;
};

type CartItems = {
  name: string;
  quantity: number;
  price: number;
};

export function ItemCard(props: ItemCardProps) {
  const cartContext = useContext(CartContext);
  const [cartItemData, setCartItemData] = useState<CartItems[]>([]);

  useEffect(() => {
    if (cartContext && cartContext.getCart) {
      cartContext.getCart();
    }
  }, []);

  useEffect(() => {
    if (cartContext && cartContext.cart) {
      setCartItemData(cartContext.cart.items);
    }
    if (!cartContext) {
      return;
    }
  }, []);

  const addItemHandler = async () => {
    if (cartItemData.some((e) => e.name === props.productName)) {
      toast.error("Item already in cart");
      return;
    } else {
        cartItemData.push({
          name: props.productName,
          price: props.price,
          quantity: 1,
        }
      );
      if (cartContext && cartContext.cart && cartContext.editCart && cartContext.getCart) {
      await cartContext.editCart(cartContext.cart._id, { newItems: cartItemData });
      await cartContext.getCart();
      }
    }
  };

  return (
    <Card className="grid grid-rows-4 text-ellipsis max-h-[68vh]" {...props}>
      <CardHeader className="row-span-3 group overflow-hidden w-full items-center p-0 ">
        <a
          className="max-h-[40vh] h-full object-cover group-hover:scale-105 transition-all duration-300"
          href={`/product?name=${props.productName}`}
        >
          <img className="h-[35vh]" src={props.image} alt={props.image}></img>
        </a>
        {props.sale == true ? (
          <div className="ml-auto mr-3 bg-[#334fb4] bg-opacity-90 rounded-lg text-white flex px-4 text-sm justify-center z-10 py-1 w-[10vh] ">
            Sale
          </div>
        ) : (
          ""
        )}
      </CardHeader>
      <CardContent className="pt-2 max-h-[15vh]">
        <div>
          <div
            key={props.id}
            className="mb-4 grid grid-cols-[1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <div className="grid grid-rows-2">
              <Link
                href={`/product?name=${props.productName}`}
                className="text-ellipsis hover:text-clip hover:text-wrap text-nowrap overflow-hidden hover:underline text-sm font-medium leading-none"
              >
                {props.productName}
              </Link>
              <div className="">
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
