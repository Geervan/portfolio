import type { Metadata } from "next";
import { Inter, Patrick_Hand } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import InteractiveDoodles from "@/components/InteractiveDoodles";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-patrick",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geervan’s Notebook",
  description: "Experiments, notes, and things I’m building.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${patrickHand.variable} antialiased`}>
        <ThemeProvider>
          <InteractiveDoodles />

          <header className="header">
            <div className="logo-area">
              <Navigation />
            </div>
            <ThemeToggle />
          </header>

          <div className="container animate-enter" style={{ position: 'relative', zIndex: 1, marginTop: '100px' }}>
            <main>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
