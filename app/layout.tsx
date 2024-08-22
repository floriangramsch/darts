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
      <body className={inter.className}>
        <SocketProvider>
          <div className="bg-orange-400 w-screen h-screen text-[#0091AD] text-3xl">
            {children}
          </div>
        </SocketProvider>
      </body>
    </html>
  );
}
