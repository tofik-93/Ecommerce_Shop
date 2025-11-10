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

'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store';
import { ProductCard } from '@/components/ProductCard';

export default function FavoritesPage() {
	const items = useAppSelector((s) => Object.values(s.favorites.items));
	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">Favorites</h1>
			{items.length === 0 ? (
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					No favorites yet. Go back to{' '}
					<Link href="/" className="text-blue-600 underline underline-offset-4">
						Products
					</Link>
					.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{items.map((p) => (
						<ProductCard key={p.id} product={p} />
					))}
				</div>
			)}
		</div>
	);
}


