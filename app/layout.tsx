import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { DemoProvider } from "@/components/DemoProvider";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
});

const serif = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kora — Identité économique",
  description:
    "Passeport économique consentie pour les petits entrepreneurs. Prototype de démonstration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
