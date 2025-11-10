import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';

type FavoritesState = {
	items: Record<number, Product>;
};

const initialState: FavoritesState = {
	items: {}
};

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		toggleFavorite(state, action: PayloadAction<Product>) {
			const product = action.payload;
			if (state.items[product.id]) {
				delete state.items[product.id];
			} else {
				state.items[product.id] = product;
			}
		},
		removeFavorite(state, action: PayloadAction<number>) {
			delete state.items[action.payload];
		},
		clearFavorites(state) {
			state.items = {};
		}
	}
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

