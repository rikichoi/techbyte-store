import connectMongoDb from "@/lib/mongodb";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { items } = await request.json();
  await connectMongoDb();
  await Cart.create({
    items,
  });
  return NextResponse.json({ message: "Cart Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDb();
  const carts = await Cart.find();
  return NextResponse.json({ carts });
}

export async function PUT(request) {
  const id = request.nextUrl.searchParams.get("id");
  const { newItems: items } = await request.json();
  await connectMongoDb();
  await Cart.findByIdAndUpdate(id, {
    items,
  });
  return NextResponse.json({ message: "Cart updated" }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDb();
  await Cart.findByIdAndDelete(id);
  return NextResponse.json({ message: "Cart deleted" }, { status: 200 });
}
