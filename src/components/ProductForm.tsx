'use client';

import { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types/product';

type ProductPayload = {
	title: string;
	description: string;
	price: number;
	stock: number;
	brand: string;
	category: string;
};

type Props = {
	initial?: Partial<Product>;
	id?: number;
	mode: 'create' | 'edit';
};

export function ProductForm({ initial, id, mode }: Props) {
	const router = useRouter();
	const [values, setValues] = useState<ProductPayload>({
		title: initial?.title ?? '',
		description: initial?.description ?? '',
		price: initial?.price ?? 0,
		stock: initial?.stock ?? 0,
		brand: initial?.brand ?? '',
		category: initial?.category ?? ''
	});
	const [loading, setLoading] = useState(false);

	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setValues((v) => ({
			...v,
			[name]: name === 'price' || name === 'stock' ? Number(value) : value
		}));
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			if (mode === 'create') {
				await api.post('/products/add', values);
				toast.success('Product created');
			} else {
				await api.patch(`/products/${id}`, values);
				toast.success('Product updated');
			}
			router.push('/');
		} catch {
			toast.error('Failed to submit product');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={onSubmit} className="space-y-4 max-w-xl">
			<div>
				<label className="mb-1 block text-sm font-medium">Title</label>
				<Input name="title" value={values.title} onChange={onChange} required />
			</div>
			<div>
				<label className="mb-1 block text-sm font-medium">Description</label>
				<textarea
					name="description"
					value={values.description}
					onChange={onChange}
					required
					className="min-h-28 w-full rounded-md border border-neutral-200 bg-transparent p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-200 dark:border-neutral-800"
				/>
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label className="mb-1 block text-sm font-medium">Price</label>
					<Input name="price" type="number" value={values.price} onChange={onChange} required />
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium">Stock</label>
					<Input name="stock" type="number" value={values.stock} onChange={onChange} required />
				</div>
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label className="mb-1 block text-sm font-medium">Brand</label>
					<Input name="brand" value={values.brand} onChange={onChange} required />
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium">Category</label>
					<Input name="category" value={values.category} onChange={onChange} required />
				</div>
			</div>
			<div className="flex gap-3">
				<Button type="submit" disabled={loading}>
					{mode === 'create' ? 'Create' : 'Save Changes'}
				</Button>
			</div>
		</form>
	);
}


