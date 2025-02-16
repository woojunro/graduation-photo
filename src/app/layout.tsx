import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "졸업생은 추억이 필요해요",
  description: "마지막으로 함께 사진 찍기를 원합니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "졸업생은 추억이 필요해요",
    description: "마지막으로 함께 사진 찍기를 원합니다.",
    images: [
      {
        url: process.env.NEXT_PUBLIC_THUMBNAIL_IMAGE_SRC as string,
        width: 1002,
        height: 668,
        alt: "졸업생은 추억이 필요해요",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
