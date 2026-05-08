import "./globals.css";
import { Providers } from "./providers";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "Aigram",
  description: "AI-assisted social media portfolio project with feed, reels, messages, dark mode, and AI interaction features.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
