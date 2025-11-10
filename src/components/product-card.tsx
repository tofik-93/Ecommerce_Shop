"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/favoritesSlice";
import { toast } from "sonner";
import { useState } from "react";
import { deleteProduct } from "@/lib/products";
import { AlertDialog } from "@/components/ui/alert-dialog";

export function ProductCard({ product }: { product: Product }) {
	const dispatch = useAppDispatch();
	const favIds = useAppSelector((s) => s.favorites.ids);
	const isFav = favIds.includes(product.id);
	const [confirmOpen, setConfirmOpen] = useState(false);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<Link href={`/product/${product.id}`} className="hover:underline">
						{product.title}
					</Link>
					<span className="text-sm opacity-70">${product.price}</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="relative h-40 w-full overflow-hidden rounded-md border">
					<Image
						src={product.thumbnail}
						alt={product.title}
						fill
						sizes="(max-width: 768px) 100vw, 33vw"
						className="object-cover"
					/>
				</div>
				<p className="text-sm opacity-80">
					{product.category} • ⭐ {product.rating}
				</p>
				<div className="flex items-center gap-2">
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
					<Button variant="destructive" onClick={() => setConfirmOpen(true)}>
						Delete
					</Button>
				</div>
			</CardContent>
			{confirmOpen ? (
				<AlertDialog
					title="Delete product?"
					description="This will permanently delete the product."
					onCancel={() => setConfirmOpen(false)}
					onConfirm={async () => {
						await deleteProduct(product.id);
						toast.success("Product deleted");
						setConfirmOpen(false);
					}}
				/>
			) : null}
		</Card>
	);
}


