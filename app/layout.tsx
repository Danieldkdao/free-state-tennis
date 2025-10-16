import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free State Firebirds Tennis",
  description:
    "This is the official website of the Free State Firebirds Tennis Team!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
