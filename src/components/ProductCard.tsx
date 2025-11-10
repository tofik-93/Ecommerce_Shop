'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from './ui/Button';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleFavorite } from '@/store/slices/favoritesSlice';

type Props = {
	product: Product;
};

export function ProductCard({ product }: Props) {
	const dispatch = useAppDispatch();
	const isFavorite = useAppSelector((s) => Boolean(s.favorites.items[product.id]));
	return (
		<div className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
			<Link href={`/product/${product.id}`} className="block">
				<div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-900">
					<Image
						src={product.thumbnail}
						alt={product.title}
						fill
						className="object-cover transition-transform duration-300 hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
				<div className="mb-2 flex items-start justify-between gap-3">
					<h3 className="line-clamp-2 text-sm font-semibold">{product.title}</h3>
					<span className="shrink-0 rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium dark:bg-neutral-900">
						{product.category}
					</span>
				</div>
				<div className="mb-3 flex items-center justify-between">
					<p className="text-lg font-bold">${product.price}</p>
					<div className="flex items-center gap-1 text-sm">
						<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
						<span>{product.rating}</span>
					</div>
				</div>
			</Link>
			<Button
				variant={isFavorite ? 'secondary' : 'default'}
				className="w-full"
				onClick={() => dispatch(toggleFavorite(product))}
			>
				<Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
				{isFavorite ? 'Remove Favorite' : 'Add to Favorite'}
			</Button>
		</div>
	);
}


