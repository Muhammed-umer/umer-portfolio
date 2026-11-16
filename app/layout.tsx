import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LiquidGlassLayer from "@/components/LiquidGlass";
import BootLoader from "@/components/BootLoader";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammed-umer.me"),
  title: "Muhammed Umer S | Portfolio - Software Developer",
  description: "Professional portfolio of Muhammed Umer S (Md Umer), a passionate Software Developer based in Erode, India. Explore my full-stack projects, skills, and achievements.",
  keywords: [
    "Muhammed Umer S", 
    "Muhammed Umer", 
    "Md Umer", 
    "Muhammed Umer Portfolio", 
    "Md Umer Portfolio",
    "Md_umer77",
    "Software Developer", 
    "Java Developer",
    "Full Stack Developer", 
    "Frontend Developer",
    "React Developer", 
    "Next.js Developer",
    "Government College Of Engineering Erode",
    "GCE Erode",
    "Software Engineer Portfolio"
  ],
  authors: [{ name: "Muhammed Umer S" }],
  creator: "Muhammed Umer S",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Muhammed Umer S | Software Developer Portfolio",
    description: "Professional portfolio of Muhammed Umer S (Md Umer). Discover my projects, coding achievements, and software development journey.",
    siteName: "Muhammed Umer S Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammed Umer S | Software Developer",
    description: "Portfolio of Muhammed Umer (Md Umer) - Software Developer specializing in modern web applications.",
    creator: "@md_umer77",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "PlsvyFpTLL3bs61o16T-j_DzwyckR9nvPTMUhVGn_rM",
    other: {
      "msvalidate.01": "69314309616BF8ADACABF6B9CCFD26F6",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // BootLoader's inline script stamps `data-booted` on <html> before
      // hydration on repeat visits; only this element's attributes are exempt.
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* First in the stream so the boot screen is the first thing painted. */}
        <BootLoader />
        {children}
        <Analytics />
        <SpeedInsights />
        {/* Rendered after the page so the ambient light sits above the page
            background but below the z-10 content. */}
        <LiquidGlassLayer />
      </body>
    </html>
  );
}
