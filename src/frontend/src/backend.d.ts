import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
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
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, description: string, imageUrl: string, price: string, category: string, affiliateLink: string, featured: boolean): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(id: bigint): Promise<boolean>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProductCount(): Promise<bigint>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seed(): Promise<void>;
    updateProduct(id: bigint, name: string, description: string, imageUrl: string, price: string, category: string, affiliateLink: string, featured: boolean): Promise<boolean>;
}
