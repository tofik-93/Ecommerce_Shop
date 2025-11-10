import { ProductForm } from '@/components/ProductForm';

export default function CreateProductPage() {
	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">Create Product</h1>
			<ProductForm mode="create" />
		</div>
	);
}


