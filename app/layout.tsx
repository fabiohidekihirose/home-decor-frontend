import "./globals.css";
import { Providers } from "@/redux/provider";

export const metadata = {
  title: "HomeDecor",
  description: "Transform your space!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-auto">
      <body className="static">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
