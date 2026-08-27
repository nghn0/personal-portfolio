import type { Metadata } from "next";
import { Inter, Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import CursorGlow from "@/components/CursorGlow";
import ChatAssistant from "@/components/ChatAssistant";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Nithish Gowda H N | AI Engineer",
  description: "Futuristic portfolio of an AI Engineer specializing in Deep Learning, Full-Stack Development, and Explainable AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark scroll-smooth",
        inter.variable,
        spaceGrotesk.variable,
        orbitron.variable
      )}
    >
      <body className="min-h-screen bg-[#0a0a0f] text-gray-200 antialiased selection:bg-[#b9c3d4] selection:text-black overflow-x-hidden">
        <CursorGlow />
        <Navbar />
        {children}
        <ChatAssistant />
      </body>
    </html>
  );
}
