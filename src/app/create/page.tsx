"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/product-form";
import { createProduct } from "@/lib/products";
import { toast } from "sonner";

export default function CreateProductPage() {
	const router = useRouter();
	return (
		<div className="max-w-2xl">
			<h1 className="mb-4 text-xl font-semibold">Create Product</h1>
			<ProductForm
				onSubmit={async (values) => {
					const res = await createProduct(values);
					toast.success("Product created");
					router.push(`/product/${res.id}`);
				}}
			/>
		</div>
	);
}


