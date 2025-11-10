import { api } from "@/lib/api";
import { Product, ProductResponse } from "@/types/product";
import { ProductFormValues } from "@/components/product-form";

export async function getProducts({ limit = 10, skip = 0 }: { limit?: number; skip?: number }): Promise<ProductResponse> {
	const { data } = await api.get<ProductResponse>(`/products?limit=${limit}&skip=${skip}`);
	return data;
}

export async function searchProducts(q: string): Promise<ProductResponse> {
	const { data } = await api.get<ProductResponse>(`/products/search?q=${encodeURIComponent(q)}`);
	return data;
}

export async function getProductById(id: number): Promise<Product> {
	const { data } = await api.get<Product>(`/products/${id}`);
	return data;
}

export async function createProduct(values: ProductFormValues): Promise<Product> {
	const { data } = await api.post<Product>("/products/add", values);
	return data;
}

export async function updateProduct(id: number, values: ProductFormValues): Promise<Product> {
	const { data } = await api.patch<Product>(`/products/${id}`, values);
	return data;
}

export async function deleteProduct(id: number): Promise<{ id: number; isDeleted?: boolean }> {
	const { data } = await api.delete<{ id: number; isDeleted?: boolean }>(`/products/${id}`);
	return data;
}


