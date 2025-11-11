import "@/app/globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/store/Providers";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { ReactNode } from "react";

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
