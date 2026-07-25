import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { NeuralNoise } from "@/components/ui/neural-noise";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Mayank Suri | Full Stack Developer",
  description: "Portfolio of Mayank Suri, a Full Stack Developer and B.Tech Information Technology student at USICT, GGSIPU.",
  keywords: ["Mayank Suri", "Full Stack Developer", "USICT", "GGSIPU", "WanderLust AI", "Web Developer"],
  authors: [{ name: "Mayank Suri" }],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable}`}>
      <body className="relative min-h-screen bg-[#09090b]">
        <NeuralNoise color={[0.68, 0.26, 0.96]} opacity={0.16} speed={0.0012} />
        <div className="relative z-10">
          <SmoothScroll>{children}</SmoothScroll>
        </div>
      </body>
    </html>
  );
}
