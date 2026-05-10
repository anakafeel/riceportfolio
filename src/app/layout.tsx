import type { Metadata } from "next";
import { 
  Press_Start_2P, 
  VT323, 
  EB_Garamond, 
  Major_Mono_Display, 
  JetBrains_Mono,
  Geist,
  Geist_Mono,
  Archivo_Black
} from "next/font/google";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
});
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

const majorMonoDisplay = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-major-mono",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "saim-rice · portfolio",
  description: "Linux-native portfolio simulating a Fedora 42 + Niri window manager environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`
      ${pressStart2P.variable} 
      ${vt323.variable} 
      ${ebGaramond.variable} 
      ${majorMonoDisplay.variable} 
      ${jetbrainsMono.variable}
      ${geistSans.variable} 
      ${geistMono.variable}
      ${archivoBlack.variable}
      h-full antialiased
    `}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var theme = localStorage.getItem('newport-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
            document.documentElement.setAttribute('data-theme', theme);
          })()
        ` }} />
      </head>
      <body className="bg-[#07060E] text-[#F2F0FF] selection:bg-[#FF2AB8] selection:text-[#07060E] min-h-full">
        {children}
      </body>
    </html>
  );
}
