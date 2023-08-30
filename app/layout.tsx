import Navigation from "@/components/navigation/navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/navigation/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Blog",
  description:
    "Learn how to build a full-stack, multilingual and high performant blog website with Next.js 13.4 and Directus.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <div className="min-h-[calc(100vh-300px)] pt-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
