import connectMongoDb from "@/lib/mongodb";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTotalCost: totalCost, newItems: items } = await request.json();
  await connectMongoDb();
  await Cart.findByIdAndUpdate(id, {
    totalCost,
    items,
  });
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDb();
  const cart = await Cart.findOne({ _id: id });
  return NextResponse.json({ cart }, { status: 200 });
}
