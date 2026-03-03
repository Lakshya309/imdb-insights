import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";


export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
export const metadata = {
  title: "IMDb Insights",
  description: "IMDb Insights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable}`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
