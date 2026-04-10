import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "送料計算アプリ",
  description: "都道府県と箱サイズから送料を計算します",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
