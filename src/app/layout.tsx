"use client";

import "@/app/globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/store/Providers";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { ReactNode, useEffect } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>
					<header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
						<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
							<nav className="flex items-center gap-4">
								<Link href="/" className="font-semibold">
									eCommerce Shop
								</Link>
								<Link href="/favorites" className="text-sm opacity-80 hover:opacity-100">
									Favorites
								</Link>
								<Link href="/create" className="text-sm opacity-80 hover:opacity-100">
									Create
								</Link>
							</nav>
							<div className="flex items-center gap-3">
								<Link href="/login" className="text-sm opacity-80 hover:opacity-100">
									Login
								</Link>
								<ThemeToggle />
							</div>
						</div>
					</header>
					<main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
					<Toaster position="top-right" richColors />
				</Providers>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "@/store/Providers";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eCommerce Shop",
  description: "A simple eCommerce demo built with Next.js, Redux, Tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <header className="border-b border-neutral-200 dark:border-neutral-800">
            <div className="container flex h-14 items-center justify-between">
              <nav className="flex items-center gap-4 text-sm">
                <Link href="/" className="font-semibold">Shop</Link>
                <Link href="/favorites" className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white">Favorites</Link>
                <Link href="/products/create" className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white">Create</Link>
              </nav>
              <ThemeToggle />
            </div>
          </header>
          <main className="container py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
