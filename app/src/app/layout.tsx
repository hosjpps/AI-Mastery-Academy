import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Mastery Academy | Learn AI Skills",
  description: "Master AI skills through gamified learning. Quests, XP, levels, and an AI coach to guide your journey.",
  keywords: ["AI", "learning", "prompt engineering", "gamification", "education"],
  authors: [{ name: "AI Mastery Academy" }],
  openGraph: {
    title: "AI Mastery Academy",
    description: "Master AI skills through gamified learning",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-zinc-950 text-zinc-50`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
