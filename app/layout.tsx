import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Currency converter",
  description: "Convert different types of currencies in real time",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col dark bg-slate-900 min-h-screen`}>{children}</body>
    </html>
  );
}
