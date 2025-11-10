"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/product-form";
import { getProductById, updateProduct } from "@/lib/products";
import { Product } from "@/types/product";
import { toast } from "sonner";

export default function EditProductPage({ params }: { params: { id: string } }) {
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		getProductById(Number(params.id))
			.then(setProduct)
			.finally(() => setLoading(false));
	}, [params.id]);

	if (loading) return <p>Loading...</p>;
	if (!product) return <p>Not found.</p>;

	return (
		<div className="max-w-2xl">
			<h1 className="mb-4 text-xl font-semibold">Edit Product</h1>
			<ProductForm
				initialValues={{
					title: product.title,
					description: product.description,
					price: product.price,
					stock: product.stock,
					brand: product.brand,
					category: product.category
				}}
				onSubmit={async (values) => {
					const res = await updateProduct(product.id, values);
					toast.success("Product updated");
					router.push(`/product/${res.id}`);
				}}
			/>
		</div>
	);
}


