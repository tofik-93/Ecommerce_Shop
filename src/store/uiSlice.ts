import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

type UIState = {
	theme: Theme;
	isAuthenticated: boolean;
	username?: string;
};

const initialState: UIState = {
	theme: "light",
	isAuthenticated: false
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggleTheme(state) {
			state.theme = state.theme === "light" ? "dark" : "light";
		},
		login(state, action: PayloadAction<{ username: string }>) {
			state.isAuthenticated = true;
			state.username = action.payload.username;
		},
		logout(state) {
			state.isAuthenticated = false;
			state.username = undefined;
		}
	}
});

export const { toggleTheme, login, logout } = uiSlice.actions;
export default uiSlice.reducer;


