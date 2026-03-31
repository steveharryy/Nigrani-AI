import type { Metadata } from "next";
import { Josefin_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { GrainyOverlay } from "@/components/ui/GrainyOverlay";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nigrani AI (निगरानी AI) | UPI Fraud Detection",
  description: "AI-Powered UPI Fraud Detection with ML Risk Engine and AI Insight Engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${inter.variable} antialiased bg-[#0a0a0b] text-white font-inter`}
      >
        <GrainyOverlay />
        <Toaster theme="dark" position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}

