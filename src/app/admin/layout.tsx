import { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata = {
  title: "IPS Admin Panel",
  description: "Admin panel for IPS Middle East website management",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-black bg-background min-h-screen">
        {children}
      </body>
    </html>
  );
}