import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import { DemoProvider } from "@/components/DemoProvider";
import "./globals.css";

const bodyFont = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const headingFont = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kora — Votre activité mérite d’être visible",
  description:
    "Kora transforme l’activité fragmentée des entrepreneurs en un passeport économique portable, lisible et partagé uniquement avec leur consentement.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
