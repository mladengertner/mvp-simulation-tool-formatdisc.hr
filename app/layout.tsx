import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "FORMATDISC - MVP Simulation Tool",
  description: "AI-powered MVP simulator for startup validation. Validate - Design - Launch - Pitch.",
  keywords: ["MVP", "startup", "validation", "AI", "business model", "financial projections"],
  authors: [{ name: "FORMATDISC, vl. Mladen Gertner", email: "info@formatdisc.hr" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "FORMATDISC - MVP Simulation Tool",
    description: "AI-powered MVP simulator for startup validation",
    url: "https://www.formatdisc.hr",
    siteName: "FORMATDISC",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
