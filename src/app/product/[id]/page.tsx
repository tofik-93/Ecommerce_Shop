"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProductById } from "@/lib/products";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/favoritesSlice";
import { toast } from "sonner";
import Link from "next/link";

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const favIds = useAppSelector((s) => s.favorites.ids);
	const dispatch = useAppDispatch();

	useEffect(() => {
		getProductById(Number(params.id))
			.then(setProduct)
			.finally(() => setLoading(false));
	}, [params.id]);

	if (loading) return <p>Loading...</p>;
	if (!product) return <p>Not found.</p>;

	const isFav = favIds.includes(product.id);

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div className="space-y-3">
				<div className="relative aspect-square w-full overflow-hidden rounded-lg border">
					<Image
						src={product.thumbnail}
						alt={product.title}
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						className="object-cover"
					/>
				</div>
				<div className="grid grid-cols-4 gap-2">
					{product.images.slice(0, 4).map((img, i) => (
						<div key={i} className="relative aspect-square overflow-hidden rounded-md border">
							<Image src={img} alt={`${product.title}-${i}`} fill className="object-cover" />
						</div>
					))}
				</div>
			</div>
			<div className="space-y-3">
				<h1 className="text-2xl font-semibold">{product.title}</h1>
				<p className="text-sm opacity-80">{product.brand}</p>
				<p className="text-lg font-medium">${product.price}</p>
				<p className="text-sm">Rating: {product.rating} • Stock: {product.stock}</p>
				<p className="text-sm opacity-90">{product.description}</p>
				<div className="flex items-center gap-3 pt-2">
					<Button
						variant={isFav ? "secondary" : "default"}
						onClick={() => {
							dispatch(toggleFavorite(product));
							toast.success(isFav ? "Removed from favorites" : "Added to favorites");
						}}
					>
						{isFav ? "Unfavorite" : "Add to Favorite"}
					</Button>
					<Link href={`/edit/${product.id}`}>
						<Button variant="outline">Edit</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Product } from '@/types/product';
import { FavoriteButton } from './parts/FavoriteButton';
import { DeleteButton } from './parts/DeleteButton';

type PageProps = {
	params: { id: string };
};

async function getProduct(id: string) {
	const { data } = await api.get<Product>(`/products/${id}`);
	return data;
}

export default async function ProductPage({ params }: PageProps) {
	const product = await getProduct(params.id);
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div className="space-y-3">
				<div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
					<Image src={product.thumbnail} alt={product.title} fill className="object-cover" />
				</div>
				<div className="grid grid-cols-3 gap-2">
					{product.images.slice(0, 6).map((src, i) => (
						<div key={i} className="relative aspect-video overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-900">
							<Image src={src} alt={`${product.title}-${i}`} fill className="object-cover" />
						</div>
					))}
				</div>
			</div>
			<div className="space-y-4">
				<h1 className="text-2xl font-bold">{product.title}</h1>
				<p className="text-neutral-600 dark:text-neutral-300">{product.description}</p>
				<div className="flex items-center gap-4">
					<span className="text-2xl font-bold">${product.price}</span>
					<span className="rounded-md bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-900">{product.brand}</span>
					<span className="rounded-md bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-900">{product.category}</span>
				</div>
				<p className="text-sm text-neutral-600 dark:text-neutral-400">Stock: {product.stock}</p>
				<div className="flex items-center gap-3">
					<FavoriteButton product={product} />
					<Link
						className="text-sm font-medium text-blue-600 underline underline-offset-4"
						href={`/products/${product.id}/edit`}
					>
						Edit
					</Link>
					<DeleteButton id={product.id} />
				</div>
			</div>
		</div>
	);
}


