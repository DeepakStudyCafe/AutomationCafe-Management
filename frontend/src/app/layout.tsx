import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "../providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyCafeTools | Premium Tax & Compliance Suite",
  description: "Modernized platform for professional compliance, tax tools, and subscriptions.",
};

import { Header } from "../components/automationcafe/Header";
import { Footer } from "../components/automationcafe/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <QueryProvider>
          <div className="relative flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1 bg-white">
              {children}
            </main>
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
