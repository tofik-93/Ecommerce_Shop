import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
	let handle: any;
	return (...args: Parameters<T>) => {
		clearTimeout(handle);
		handle = setTimeout(() => fn(...args), delay);
	};
}


