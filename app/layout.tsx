import { font } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: {
    default: "Mongtemp",
    template: "%s | Mongtemp",
  },
  description: "A boilerplate",
  icons: [
    {
      rel: "icon",
      url: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={font.className}>
          <div className="pattern fixed inset-0 opacity-[0.015]" />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
