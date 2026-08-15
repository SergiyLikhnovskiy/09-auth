import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "A simple and convenient app for creating, managing, and quickly finding your notes.",
  openGraph: {
    url: "https://08-zustand-s6ic.vercel.app/",
    title: "NoteHub",
    description:
      "A simple and convenient app for creating, managing, and quickly finding your notes.",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub openGraph",
      },
    ],
  },
};

interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: LayoutProps) {
  return (
    <html lang="en">
      <body className={` ${roboto.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
