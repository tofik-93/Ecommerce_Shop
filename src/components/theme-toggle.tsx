"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/uiSlice";

export function ThemeToggle() {
	const theme = useAppSelector((s) => s.ui.theme);
	const dispatch = useAppDispatch();
	return (
		<button
			aria-label="Toggle theme"
			className="h-9 rounded-md border px-3 text-sm"
			onClick={() => dispatch(toggleTheme())}
		>
			{theme === "light" ? "Light" : "Dark"}
		</button>
	);
}


