import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CineMaze | Descubra Filmes e Séries",
  description:
    "Explore o catálogo completo de filmes, séries e produções em tempo real com a API do TVmaze.",
  keywords: ["filmes", "séries", "tvmaze", "cinema", "catalogo", "streaming"],
  authors: [{ name: "CineMaze Team" }],
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-purple-600 selection:text-white">
        {/* Background glow global sutil */}
        <div className="fixed inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        
        {children}
      </body>
    </html>
  );
}