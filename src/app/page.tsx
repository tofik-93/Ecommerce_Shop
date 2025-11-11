"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getProducts, searchProducts } from "@/lib/products";
import { Product, ProductResponse } from "@/types/product";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { debounce } from "@/lib/utils";

const PAGE_SIZE = 10;

export default function HomePage() {
	const [query, setQuery] = useState("");
	const [products, setProducts] = useState<Product[]>([]);
	const [skip, setSkip] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [isSearching, setIsSearching] = useState(false);

	const sentinelRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		loadMore(true).catch(() => {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!sentinelRef.current) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && !isLoading && hasMore && !isSearching) {
					loadMore().catch(() => {});
				}
			},
			{ rootMargin: "400px 0px 0px 0px" }
		);
		observer.observe(sentinelRef.current);
		return () => observer.disconnect();
	}, [isLoading, hasMore, isSearching]);

	const doSearch = useMemo(
		() =>
			debounce(async (q: string) => {
				if (!q) {
					setIsSearching(false);
					setProducts([]);
					setSkip(0);
					setHasMore(true);
					await loadMore(true);
					return;
				}
				setIsSearching(true);
				setIsLoading(true);
				try {
					const res = await searchProducts(q);
					setProducts(res.products);
					setHasMore(false);
				} finally {
					setIsLoading(false);
				}
			}, 400),
		[]
	);

	async function loadMore(reset: boolean = false) {
		if (isLoading) return;
		setIsLoading(true);
		try {
			const nextSkip = reset ? 0 : skip;
			const res: ProductResponse = await getProducts({ limit: PAGE_SIZE, skip: nextSkip });
			setProducts((prev) => (reset ? res.products : [...prev, ...res.products]));
			setSkip(nextSkip + PAGE_SIZE);
			setHasMore(res.total > nextSkip + PAGE_SIZE);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3">
				<Input
					placeholder="Search products..."
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						doSearch(e.target.value);
					}}
					className="max-w-md"
				/>
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{products.map((p) => (
					<ProductCard key={p.id} product={p} />
				))}
				{isLoading &&
					Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="space-y-3 rounded-lg border p-3">
							<Skeleton className="h-40 w-full" />
							<Skeleton className="h-4 w-2/3" />
							<Skeleton className="h-4 w-1/2" />
							<Skeleton className="h-8 w-24" />
						</div>
					))}
			</div>
			<div ref={sentinelRef} />
			{!hasMore && !isSearching && (
				<p className="text-center text-sm opacity-70">You&apos;ve reached the end.</p>
			)}
		</div>
	);
}
