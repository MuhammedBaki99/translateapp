import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Çeviri Uygulaması",
  description: "Metinlerinizi kolayca çevirin ve yönetin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`antialiased bg-[url("/hero_img-sm.jpg")] sm:bg-[url("/hero_img.jpg")] bg-no-repeat bg-size-[100%] bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
