import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata = {
  title: "IPS Admin Panel",
  description: "Admin panel for IPS Middle East website management",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-black bg-background min-h-screen">
        {children}
      </body>
    </html>
  );
}
