import type { Metadata } from "next";
import localFont from "@next/font/local";
import "./globals.css";

const Lucida = localFont({
  src: [
    {
      path: "./fonts/lucida.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/lucidabold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
});
export const metadata: Metadata = {
  title: "Moksh",
  description: "Moksh Shah's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Lucida.className}`}>{children}</body>
    </html>
  );
}
