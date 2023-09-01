import Navigation from "@/components/navigation/navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/navigation/footer";
import siteConfig from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.siteName,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation locale={lang} />
        <div className="min-h-[calc(100vh-300px)] pt-10">{children}</div>
        <Footer locale={lang} />
      </body>
    </html>
  );
}
