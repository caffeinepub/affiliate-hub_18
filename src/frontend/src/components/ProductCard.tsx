import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import type { Product } from "../backend.d";

const categoryStyles: Record<string, string> = {
  Fashion: "category-badge-fashion",
  "Home Decor": "category-badge-home-decor",
};

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const badgeClass =
    categoryStyles[product.category] ?? "category-badge-default";

  return (
    <article
      data-ocid={`products.item.${index}`}
      className="product-card group flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-secondary">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://placehold.co/400x533/f5ede8/8c6b5a?text=${encodeURIComponent(product.name)}`;
          }}
        />
        {product.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-foreground text-primary-foreground text-[9px] font-medium uppercase tracking-[0.18em] px-2.5 py-1">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 py-4 gap-3 border-t border-border">
        <div className="flex items-start justify-between gap-2 px-1">
          <Badge
            variant="outline"
            className={`text-[10px] font-medium shrink-0 border rounded-none ${badgeClass}`}
          >
            {product.category}
          </Badge>
          <span className="font-display text-base font-semibold text-foreground">
            {product.price}
          </span>
        </div>

        <div className="flex-1 space-y-1 px-1">
          <h3 className="font-display font-semibold text-sm text-foreground leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 font-light">
            {product.description}
          </p>
        </div>

        <div className="px-1">
          <Button
            data-ocid="product.shop_now.button"
            asChild
            size="sm"
            variant="outline"
            className="w-full gap-2 border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground rounded-none text-[10px] font-medium tracking-[0.14em] uppercase transition-colors"
          >
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Shop Now
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
