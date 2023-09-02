import Navigation from "@/components/navigation/navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/navigation/footer";
import siteConfig from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: siteConfig.siteName,
//   description: siteConfig.description,
// };

export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dictionary = await getDictionary(lang);
  return {
    title: {
      template: `%s | ${siteConfig.siteName}`,
      default: siteConfig.siteName,
    },
    description: dictionary.footer.description,
    openGraph: {
      title: siteConfig.siteName,
      description: dictionary.footer.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      siteName: siteConfig.siteName,
      images: [
        {
          url: "https://localhost:3000/opengraph-image.png",
          width: 1200,
          height: 628,
        },
      ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        "kr-KOR": `${process.env.NEXT_PUBLIC_SITE_URL}/kr`,
      },
    },
    verification: {
      google: "_uYgVeerWSn62jwPdybjAzYyJiOA2NfyQQVj8h-DYE",
    },
  };
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
      {/* Google tag (gtag.js)   */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-MG8EQ0DS23"
      />
      <Script id="google-analytics">
        {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-MG8EQ0DS23');`}
      </Script>

      <body className={inter.className}>
        <Navigation locale={lang} />
        <div className="min-h-[calc(100vh-300px)] pt-10">{children}</div>
        <Footer locale={lang} />
      </body>
    </html>
  );
}
