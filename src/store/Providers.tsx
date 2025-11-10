/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppSelector } from './index';
import { Toaster } from 'sonner';

function ThemeApplier({ children }: { children: ReactNode }) {
	const theme = useAppSelector((s) => s.theme.mode);
	useEffect(() => {
		if (typeof document === 'undefined') return;
		const root = document.documentElement;
		if (theme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}, [theme]);
	return (
		<>
			{children}
			<Toaster position="top-right" richColors />
		</>
	);
}

export function Providers({ children }: { children: ReactNode }) {
	return (
		<Provider store={store}>
			<ThemeApplier>{children}</ThemeApplier>
		</Provider>
	);
}


