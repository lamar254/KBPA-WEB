import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GamesTicker from "@/components/GamesTicker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const revalidate = 60;

export const metadata: Metadata = {
  title: "KBPA | Kenya Basketball Players Association",
  description:
    "The Players Are the Game. KBPA protects, represents, educates, empowers, and advocates for Kenyan basketball players.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-kbpa-white text-kbpa-black">
        <Header />
        <GamesTicker />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
