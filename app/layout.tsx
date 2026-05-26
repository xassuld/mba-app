import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MBA | Mongolian Basketball Association",
  description:
    "Official home of the Mongolian Basketball League - scores, standings, schedules, teams, and news.",
  icons: {
    icon: "/images/league-logo.png",
    apple: "/images/league-logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("mba-theme");
    var root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(stored === "light" ? "light" : "dark");
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${inter.variable} ${oswald.variable} font-sans flex min-h-screen flex-col`}
      >
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
