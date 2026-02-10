import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/components/I18nProvider";

export const metadata: Metadata = {
  title: "3x10 Sponsor Deck",
  description: "3x10 Sponsor Deck",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark font-sans overflow-x-hidden">
      <body className="antialiased overflow-x-hidden">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
