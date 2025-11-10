'use client';

import { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleFavorite } from '@/store/slices/favoritesSlice';

export function FavoriteButton({ product }: { product: Product }) {
	const dispatch = useAppDispatch();
	const isFavorite = useAppSelector((s) => Boolean(s.favorites.items[product.id]));
	return (
		<Button variant={isFavorite ? 'secondary' : 'default'} onClick={() => dispatch(toggleFavorite(product))}>
			<Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
			{isFavorite ? 'Remove Favorite' : 'Add to Favorite'}
		</Button>
	);
}


