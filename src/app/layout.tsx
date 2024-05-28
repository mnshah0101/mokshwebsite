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
  description:
    "hello! i am moksh shah, a student at georgia tech studying computer science with a focus on system architecture and computer intelligence. i am deeply interested in making cool software products and working with great people. i'm a full stack engineer at heart and i love working on building beautiful uis with clean, efficient backends. my go-to tech stack consists of react and go, but i am always open to learning new technologies.",
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
