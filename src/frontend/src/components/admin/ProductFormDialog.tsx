import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "../../backend.d";

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  affiliateLink: string;
  featured: boolean;
}

const empty: ProductFormData = {
  name: "",
  description: "",
  price: "",
  category: "Fashion",
  imageUrl: "",
  affiliateLink: "",
  featured: false,
};

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  isPending: boolean;
  product?: Product | null;
}

export function ProductFormDialog({
  open,
  onClose,
  onSubmit,
  isPending,
  product,
}: ProductFormDialogProps) {
  const [form, setForm] = useState<ProductFormData>(empty);

  useEffect(() => {
    if (!open) return;
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl,
        affiliateLink: product.affiliateLink,
        featured: product.featured,
      });
    } else {
      setForm(empty);
    }
  }, [open, product]);

  const set = (key: keyof ProductFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="admin.product_form.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-medium">
            {product ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label
                htmlFor="pf-name"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Product Name *
              </Label>
              <Input
                id="pf-name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                placeholder="e.g. Cashmere Wrap Coat"
                data-ocid="admin.product_form.name_input"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="pf-price"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Price *
              </Label>
              <Input
                id="pf-price"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                required
                placeholder="$149.00"
                data-ocid="admin.product_form.price_input"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="pf-category"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Category *
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) => set("category", v)}
              >
                <SelectTrigger
                  id="pf-category"
                  data-ocid="admin.product_form.category_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Home Decor">Home Decor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 space-y-1.5">
              <Label
                htmlFor="pf-description"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Description
              </Label>
              <Textarea
                id="pf-description"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                placeholder="Brief product description…"
                data-ocid="admin.product_form.description_textarea"
              />
            </div>

            <div className="col-span-2 space-y-1.5">
              <Label
                htmlFor="pf-imageUrl"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Image URL
              </Label>
              <Input
                id="pf-imageUrl"
                value={form.imageUrl}
                onChange={(e) => set("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
                data-ocid="admin.product_form.image_url_input"
              />
            </div>

            <div className="col-span-2 space-y-1.5">
              <Label
                htmlFor="pf-affiliateLink"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Affiliate Link *
              </Label>
              <Input
                id="pf-affiliateLink"
                value={form.affiliateLink}
                onChange={(e) => set("affiliateLink", e.target.value)}
                required
                placeholder="https://amazon.com/dp/..."
                data-ocid="admin.product_form.affiliate_link_input"
              />
            </div>

            <div className="col-span-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="pf-featured"
                  checked={form.featured}
                  onCheckedChange={(v) => set("featured", !!v)}
                  data-ocid="admin.product_form.featured_checkbox"
                />
                <Label
                  htmlFor="pf-featured"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-sm font-medium text-foreground">
                    Featured product
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Shows in the featured section
                  </span>
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="admin.product_form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="admin.product_form.submit_button"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…
                </>
              ) : product ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
