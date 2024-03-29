import type { Metadata } from "next";
import { Karla } from "next/font/google";

import { app } from "@/lib/constants";
import { cn } from "@/lib/utils";

import "./globals.css";

const font = Karla({ subsets: ["latin"], variable: "--font-regular" });

export const metadata: Metadata = {
  title: app.name,
  description: app.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full min-h-[100vh] overflow-y-scroll">
      <body
        className={cn(font.className, "relative h-full min-h-full bg-zinc-950")}
      >
        <div
          className="relative min-h-full overflow-hidden px-4"
          vaul-drawer-wrapper=""
        >
          {children}
          <div className="noise pointer-events-none absolute inset-0 bg-repeat" />
        </div>
      </body>
    </html>
  );
}
