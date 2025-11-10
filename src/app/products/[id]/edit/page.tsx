import { ProductForm } from '@/components/ProductForm';
import { api } from '@/lib/api';
import type { Product } from '@/types/product';

type PageProps = {
	params: { id: string };
};

async function getProduct(id: string) {
	const { data } = await api.get<Product>(`/products/${id}`);
	return data;
}

export default async function EditProductPage({ params }: PageProps) {
	const product = await getProduct(params.id);
	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">Edit Product</h1>
			<ProductForm mode="edit" id={product.id} initial={product} />
		</div>
	);
}


