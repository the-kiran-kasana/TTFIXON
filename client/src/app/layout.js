import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import MainContent from "../components/MainContent/MainContent";
import { SidebarProvider } from "../context/SidebarContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "On Demand Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
      </head>

      <body className="h-screen overflow-hidden bg-gray-100">
        <SidebarProvider>
          <Navbar />
          <Sidebar />
          <MainContent>{children}</MainContent>
        </SidebarProvider>
      </body>
    </html>
  );
}