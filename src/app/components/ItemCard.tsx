"use client"
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
  const { cart, editCart } = useContext(cartContext);
  const [cartItemData, setCartItemData] = useState([]);
  const id = props.id;

  useEffect(() => {
    if (cart.carts) {
      setCartItemData(cart.carts[0].items);
    }
    if (!cart.carts) {
      return;
    }
  }, [cart]);

  const addItemHandler = () => {
    setCartItemData(cartItemData.push({name: props.productName, price: props.price, quantity: 1}));
    editCart(cart.carts[0]._id, {newItems:cartItemData});
    console.log(cartItemData)
  }

  return (
    <Card className={""} {...props}>
      <CardHeader>
        <img src={props.image} alt={props.image}></img>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4"></div>
        <div>
          <div
            key={props.id}
            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {props.productName}
              </p>
              <p className="text-sm text-muted-foreground">
                {props.productName}
              </p>
              <p className="text-sm text-muted-foreground">
                {props.description}
              </p>
              <p className="text-sm text-muted-foreground">
                ${props.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={()=>addItemHandler()} className="w-full">
          Add to cart
        </Button>
        {/* editCart(cart.carts[0]._id, ) */}
      </CardFooter>
    </Card>
  );
}
