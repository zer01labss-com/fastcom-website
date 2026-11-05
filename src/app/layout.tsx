import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fastcom Cargo | Deliver your cargo like never before",
  description:
    "Real-time tracking, temperature-controlled freight, and seamless dispatch solutions – all in one powerful cargo network.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans bg-[#fbfbfb] text-[#111113] antialiased selection:bg-neutral-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
