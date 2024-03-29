"use client";

// import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { SessionProvider } from "next-auth/react";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body
        // className={inter.className}
        >
          <ConfettiProvider />
          <ToastProvider />
          <SessionProvider>{children}</SessionProvider>
        </body>
      </html>
    </>
  );
}
