import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    featured: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    affiliateLink: string;
    price: string;
}
export interface backendInterface {
    getAllProducts(): Promise<Array<Product>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    seed(): Promise<void>;
}
