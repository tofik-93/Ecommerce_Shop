"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useAppSelector } from "./hooks";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<ThemeApplier>{children}</ThemeApplier>
		</Provider>
	);
}

function ThemeApplier({ children }: { children: React.ReactNode }) {
	const theme = useAppSelector((s) => s.ui.theme);
	useEffect(() => {
		if (typeof document !== "undefined") {
			document.documentElement.classList.toggle("dark", theme === "dark");
		}
	}, [theme]);
	return children;
}
