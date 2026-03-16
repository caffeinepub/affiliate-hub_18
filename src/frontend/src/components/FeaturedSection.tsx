import type { Product } from "../backend.d";
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./ProductSkeleton";

const SKELETON_KEYS = ["sk-feat-1", "sk-feat-2", "sk-feat-3", "sk-feat-4"];

interface FeaturedSectionProps {
  products: Product[];
  isLoading: boolean;
}

export function FeaturedSection({ products, isLoading }: FeaturedSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-2">
              Editor's Selection
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
              Featured Pieces
            </h2>
          </div>
          <div className="h-px flex-1 bg-border ml-8 mb-2" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKELETON_KEYS.map((k) => (
              <ProductSkeleton key={k} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard
                key={String(product.id)}
                product={product}
                index={i + 1}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
