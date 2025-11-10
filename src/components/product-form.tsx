"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export type ProductFormValues = {
	title: string;
	description: string;
	price: number;
	stock: number;
	brand: string;
	category: string;
};

export function ProductForm({
	initialValues,
	onSubmit
}: {
	initialValues?: Partial<ProductFormValues>;
	onSubmit: (values: ProductFormValues) => Promise<void>;
}) {
	const [values, setValues] = useState<ProductFormValues>({
		title: initialValues?.title ?? "",
		description: initialValues?.description ?? "",
		price: initialValues?.price ?? 0,
		stock: initialValues?.stock ?? 0,
		brand: initialValues?.brand ?? "",
		category: initialValues?.category ?? ""
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	function update<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
		setValues((v) => ({ ...v, [key]: value }));
	}

	return (
		<form
			className="space-y-4 rounded-lg border p-4"
			onSubmit={async (e) => {
				e.preventDefault();
				setIsSubmitting(true);
				try {
					await onSubmit(values);
				} finally {
					setIsSubmitting(false);
				}
			}}
		>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div className="space-y-1">
					<Label htmlFor="title">Title</Label>
					<Input id="title" value={values.title} onChange={(e) => update("title", e.target.value)} required />
				</div>
				<div className="space-y-1">
					<Label htmlFor="brand">Brand</Label>
					<Input id="brand" value={values.brand} onChange={(e) => update("brand", e.target.value)} required />
				</div>
				<div className="space-y-1">
					<Label htmlFor="category">Category</Label>
					<Input id="category" value={values.category} onChange={(e) => update("category", e.target.value)} required />
				</div>
				<div className="space-y-1">
					<Label htmlFor="price">Price</Label>
					<Input
						id="price"
						type="number"
						value={values.price}
						onChange={(e) => update("price", Number(e.target.value))}
						required
						min={0}
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="stock">Stock</Label>
					<Input
						id="stock"
						type="number"
						value={values.stock}
						onChange={(e) => update("stock", Number(e.target.value))}
						required
						min={0}
					/>
				</div>
				<div className="sm:col-span-2 space-y-1">
					<Label htmlFor="description">Description</Label>
					<Input
						id="description"
						value={values.description}
						onChange={(e) => update("description", e.target.value)}
						required
					/>
				</div>
			</div>
			<div className="flex justify-end">
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Submit"}
				</Button>
			</div>
		</form>
	);
}


