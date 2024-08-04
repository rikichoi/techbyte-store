import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ItemContextProvider from "@/lib/context/item-context";
import CartContextProvider from "@/lib/context/cart-context";
import Footer from "./components/Footer";
import NavBarContextProvider from "@/lib/context/navbar-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechByte",
  description: "Technology based e-commerce store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={inter.className}>
        <ItemContextProvider>
          <CartContextProvider>
            <NavBarContextProvider>
            <Navbar />
            {children}
            <Footer />
            </NavBarContextProvider>
          </CartContextProvider>
        </ItemContextProvider>
      </body>
    </html>
  );
}
