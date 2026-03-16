import { PackageOpen } from "lucide-react";
import { useState } from "react";
import type { Product } from "../backend.d";
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./ProductSkeleton";

const CATEGORIES = ["All", "Fashion", "Home Decor"];
const SKELETON_KEYS = [
  "sk-1",
  "sk-2",
  "sk-3",
  "sk-4",
  "sk-5",
  "sk-6",
  "sk-7",
  "sk-8",
];

interface ProductsSectionProps {
  products: Product[];
  isLoading: boolean;
}

export function ProductsSection({ products, isLoading }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-20 bg-secondary/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-2">
            The Collection
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
            All Pieces
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-0 mb-10 border-b border-border">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid="products.tab"
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 text-[11px] uppercase tracking-[0.18em] font-medium transition-all duration-200 border-b-2 -mb-px ${
                activeCategory === cat
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div
            data-ocid="products.loading_state"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {SKELETON_KEYS.map((k) => (
              <ProductSkeleton key={k} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-ocid="products.empty_state"
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 bg-muted flex items-center justify-center mb-4">
              <PackageOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Nothing here yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs font-light">
              No pieces found in this category. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filtered.map((product, i) => (
              <ProductCard
                key={String(product.id)}
                product={product}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
