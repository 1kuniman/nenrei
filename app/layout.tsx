import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nenrei.vercel.app";

export const metadata: Metadata = {
  title: "年齢計算機 - 生年月日から年齢・干支・星座を無料計算",
  description:
    "生年月日を入力するだけで、今日時点の正確な年齢・次の誕生日までの日数・干支・星座を即座に表示。無料で使えるシンプルな年齢計算ツールです。",
  keywords: ["年齢計算機", "年齢計算", "誕生日計算", "干支", "星座", "無料ツール"],
  authors: [{ name: "年齢計算機" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "年齢計算機 - 生年月日から年齢・干支・星座を無料計算",
    title: "年齢計算機 - 生年月日から年齢・干支・星座を無料計算",
    description:
      "生年月日を入力するだけで年齢・次の誕生日までの日数・干支・星座を即座に表示。無料ツール。",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "年齢計算機 - 生年月日から年齢・干支・星座を無料計算",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "年齢計算機 - 生年月日から年齢・干支・星座を無料計算",
    description: "生年月日を入力するだけで年齢・次の誕生日までの日数・干支・星座を即座に表示。",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: { index: true, follow: true },
  verification: {
    google: "9hsoM-4jQQ8ck8mOn39f6Z5K9A5QZOZzd_AdUX24QPM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8297663476934392"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}
