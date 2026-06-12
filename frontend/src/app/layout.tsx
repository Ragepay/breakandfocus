"use client";

import { Inter, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Loader } from "@/components/ui/Loader";
import { Toaster } from "sonner";
import { Header } from "./common/Header";
import Footer from "./common/Footer";
import { metadata } from "./config";
import { useRouteChangeLoader } from "@/hooks/useRouteChangeLoader";
import { Modal } from "@/components/ui/modals/Modal";
import { useEffect } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "600", "700"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useRouteChangeLoader(); // oculta el loader cuando cambia de ruta.

  // Restaura el fondo guardado (color o imagen) en cualquier página
  useEffect(() => {
    const img = localStorage.getItem("bgImage");
    const color = localStorage.getItem("bgColor");
    if (img) {
      document.body.style.backgroundImage = `url(${img})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";
    } else if (color) {
      document.body.style.backgroundColor = color;
    }
  }, []);

  return (
    <html lang="es">
      <head>
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body
        className={`${roboto.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Modal />
        <Header />
        <Loader />
        <Toaster richColors />
        {children}
        <Footer />
      </body>
    </html>
  );
}
