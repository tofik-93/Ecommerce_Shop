'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleTheme } from '@/store/slices/themeSlice';

export function ThemeToggle() {
	const mode = useAppSelector((s) => s.theme.mode);
	const dispatch = useAppDispatch();
	return (
		<Button variant="secondary" size="icon" aria-label="Toggle theme" onClick={() => dispatch(toggleTheme())}>
			{mode === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
		</Button>
	);
}


