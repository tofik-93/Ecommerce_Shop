"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { clearFavorites } from "@/store/favoritesSlice";

export default function FavoritesPage() {
	const favorites = useAppSelector((s) => s.favorites.items);
	const dispatch = useAppDispatch();

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">Favorites</h1>
				{favorites.length > 0 && (
					<Button variant="outline" onClick={() => dispatch(clearFavorites())}>
						Clear all
					</Button>
				)}
			</div>
			{favorites.length === 0 ? (
				<p className="opacity-80">No favorites yet.</p>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{favorites.map((p) => (
						<ProductCard key={p.id} product={p} />
					))}
				</div>
			)}
		</div>
	);
}
