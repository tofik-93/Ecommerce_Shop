import { createSlice } from '@reduxjs/toolkit';

type ThemeState = {
	mode: 'light' | 'dark';
};

const getInitialMode = (): ThemeState['mode'] => {
	if (typeof window === 'undefined') return 'light';
	const saved = window.localStorage.getItem('theme-mode') as ThemeState['mode'] | null;
	if (saved === 'light' || saved === 'dark') return saved;
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const initialState: ThemeState = {
	mode: getInitialMode()
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme(state) {
			state.mode = state.mode === 'dark' ? 'light' : 'dark';
			if (typeof window !== 'undefined') {
				window.localStorage.setItem('theme-mode', state.mode);
			}
		},
		setTheme(state, action: { payload: ThemeState['mode'] }) {
			state.mode = action.payload;
			if (typeof window !== 'undefined') {
				window.localStorage.setItem('theme-mode', state.mode);
			}
		}
	}
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;


