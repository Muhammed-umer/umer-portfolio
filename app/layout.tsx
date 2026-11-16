import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LiquidGlassLayer from "@/components/LiquidGlass";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://www.muhammed-umer.me"),

  title: "Muhammed Umer S | Software Developer | AI & LLM Enthusiast",

  description:
    "Muhammed Umer S (Md Umer) is a Software Developer and AI & LLM enthusiast from India, exploring AI engineering, large language models, backend development, and modern software systems. Explore his projects, technical skills, and achievements.",

  keywords: [
    "Muhammed Umer S",
    "Muhammed Umer",
    "Md Umer",
    "Muhammed Umer Portfolio",
    "Software Developer",
    "AI Developer",
    "AI Enthusiast",
    "LLM Enthusiast",
    "Large Language Models",
    "Generative AI",
    "AI Engineering",
    "LLM Inference",
    "Backend Developer",
    "Java Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Spring Boot Developer",
    "Government College of Engineering Erode",
    "GCE Erode"
  ],

  authors: [{ name: "Muhammed Umer S" }],
  creator: "Muhammed Umer S",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Muhammed Umer S | Software Developer | AI & LLM Enthusiast",
    description:
      "Explore Muhammed Umer S's software development projects, AI and LLM explorations, technical skills, and achievements.",
    siteName: "Muhammed Umer S Portfolio",
  },

  twitter: {
    card: "summary_large_image",
    title: "Muhammed Umer S | Software Developer | AI & LLM Enthusiast",
    description:
      "Software Developer exploring AI, LLMs, backend engineering, and modern software systems.",
    creator: "@md_umer77",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Rendered after the page so the ambient light sits above the page
            background but below the z-10 content. */}
        <LiquidGlassLayer />
      </body>
    </html>
  );
}
