'use client';

import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function DeleteButton({ id }: { id: number }) {
	const router = useRouter();
	const onDelete = async () => {
		const ok = window.confirm('Are you sure you want to delete this product?');
		if (!ok) return;
		try {
			await api.delete(`/products/${id}`);
			toast.success('Product deleted');
			router.push('/');
		} catch {
			toast.error('Failed to delete product');
		}
	};
	return (
		<Button variant="destructive" onClick={onDelete}>
			Delete
		</Button>
	);
}


