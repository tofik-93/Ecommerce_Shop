import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type FavoritesState = {
	ids: number[];
	items: Product[];
};

const initialState: FavoritesState = {
	ids: [],
	items: []
};

const favoritesSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {
		toggleFavorite(state, action: PayloadAction<Product>) {
			const id = action.payload.id;
			const idx = state.ids.indexOf(id);
			if (idx >= 0) {
				state.ids.splice(idx, 1);
				state.items = state.items.filter((p) => p.id !== id);
			} else {
				state.ids.push(id);
				const exists = state.items.some((p) => p.id === id);
				if (!exists) state.items.push(action.payload);
			}
		},
		clearFavorites(state) {
			state.ids = [];
			state.items = [];
		}
	}
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;


