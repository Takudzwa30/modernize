import type { Metadata } from "next";

// Fonts
import { Inter } from "next/font/google";

// Analytics
import { Analytics } from "@vercel/analytics/react";

// Contexts
import { UserProvider } from "@/contexts/UserContext";
import { ModalProvider } from "@/contexts/ModalContext";

// Components
import { Modal } from "@/components/advanced";

// Styles
import "@/assets/css/index.css";

// Variables
const inter = Inter({ subsets: ["latin"] });

// Metadata
export const metadata: Metadata = {
  title: {
    template: "%s | Modernize",
    default: "Modernize",
  },
  description: "E-commerce dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <UserProvider>
          <ModalProvider>
            {children}
            <Modal />
            <Analytics />
          </ModalProvider>
        </UserProvider>
      </body>
    </html>
  );
}
