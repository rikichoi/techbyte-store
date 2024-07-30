import connectMongoDb from "@/lib/mongodb";
import Item from "@/models/item";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    price,
    description,
    image,
    type,
    stock,
    productName,
    brand,
    sale,
    discount,
  } = await request.json();
  await connectMongoDb();
  await Item.create({
    price,
    description,
    image,
    type,
    stock,
    productName,
    brand,
    sale,
    discount,
  });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDb();
  const items = await Item.find();
  return NextResponse.json({ items });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDb();
  await Item.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
