import connectMongoDb from "@/lib/mongodb";
import Item from "@/models/item";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newPrice: price,
    newDescription: description,
    newImage: image,
    newType: type,
    newStock: stock,
    newProductName: productName,
    newBrand: brand,
    newSale: sale,
    newDiscount: discount,
  } = await request.json();
  await connectMongoDb();
  await Item.findByIdAndUpdate(id, {
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
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDb();
  const item = await Item.findOne({ _id: id });
  return NextResponse.json({ item }, { status: 200 });
}
