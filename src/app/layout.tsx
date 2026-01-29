import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="es" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
