import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRUD Interactivo - Spec-Driven Development Demo",
  description: "Demostración interactiva de operaciones CRUD con diseño moderno y animaciones fluidas",
  keywords: ["CRUD", "Next.js", "React", "Tailwind CSS", "Spec-Driven Development"],
  authors: [{ name: "Demo Developer" }],
  openGraph: {
    title: "CRUD Interactivo - Spec-Driven Development Demo",
    description: "Demostración interactiva de operaciones CRUD con diseño moderno",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
