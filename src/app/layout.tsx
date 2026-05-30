"use client";

import Nav from "@/components/Nav";
import "./globals.css";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();

  return (
    <html>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex flex-1 flex-col">
          {loading ? (
            <div className="flex flex-1 items-center justify-center bg-emerald-50"></div>
          ) : (
            children
          )}
        </main>
        <Footer src="/images/catLook.jpg" title="cat" />
      </body>
    </html>
  );
}
