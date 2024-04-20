import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Marcela's Portfolio",
  keywords:
    "portfolio, React, JavaScript, junior, web development, Node, Express, fullstack",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Welcome to my portfolio. I am a fullstack junior developer looking for new opportunities. Feel free to look around and contact should you have any questions!",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export default RootLayout;
