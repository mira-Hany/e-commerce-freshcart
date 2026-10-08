import type { Metadata } from "next";
import Navbar from "./_LayoutPages/Navbar/Page";

import { Cairo } from "next/font/google";
import "./globals.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import SessionProviderWrapper from "./_LayoutPages/SessionProvider/sessionProvider";
import { CartContextProvider } from "./Context/CartContext";
import Footer from "./_LayoutPages/Footer/Page";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "FreshCart E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cairo.variable}`}>
      <body className="min-h-full flex flex-col">
        <CartContextProvider>
          <SessionProviderWrapper>
            <Navbar />
            {children}
            <Footer />
          </SessionProviderWrapper>
        </CartContextProvider>
      </body>
    </html>
  );
}