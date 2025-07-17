import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";
import Providers from "@/lib/utils/providers";
import MainBase from "@/components/layout/MainBase";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Crafting Code for Business Innovation",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <div id="app">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <MainBase layout="default">
                {children}
              </MainBase>
              <Toaster />
            </Providers>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
