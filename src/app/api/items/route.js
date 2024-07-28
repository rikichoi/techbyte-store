import connectMongoDb from "@/lib/mongodb";
import Item from "@/models/item";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { price, description, image, type, stock, productName, brand } = await request.json();
  await connectMongoDb();
  await Item.create({
    price,
    description,
    image,
    type,
    stock,
    productName,
    brand,
  });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}
