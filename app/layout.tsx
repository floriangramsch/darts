import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/helper/socketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Darts",
  description: "Darts by Florian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#110E27" />
      </head>
      <body className={inter.className}>
        <SocketProvider>
          <div className="bg-bg w-screen h-screen text-[#0091AD] text-3xl">
            {children}
          </div>
        </SocketProvider>
      </body>
    </html>
  );
}
