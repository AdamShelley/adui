import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/side-bar";
import NavBar from "@/components/nav-bar";
import { ThemeProvider } from "@/components/theme-provide";
import NoiseBackground from "@/components/noise";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A/UI",
  description: "A showcase of AdamUI components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NoiseBackground className="min-h-screen ">
            <NavBar />
            <div className="w-screen h-screen flex ">
              <SideBar />
              <div className="flex-1 mb-20 ">{children}</div>
            </div>
          </NoiseBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
