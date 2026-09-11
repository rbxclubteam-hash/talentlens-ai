import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./jobs.css";
import "./candidates.css";
import "./analysis.css";
import "./compare.css";

const manrope = localFont({
  src: [
    {
      path: "../../public/fonts/manrope-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope-700.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope-800.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "TalentLens AI — Hiring intelligence",
  description:
    "An interactive recruiting portfolio demo. A clearer view of your candidates and hiring pipeline.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
