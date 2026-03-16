import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, LogOut, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../../backend.d";
import {
  useAddProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "../../hooks/useAdminQueries";
import { useAllProducts } from "../../hooks/useQueries";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { ProductFormDialog } from "./ProductFormDialog";

interface AdminPanelProps {
  onLogout: () => void;
  onBack: () => void;
}

export function AdminPanel({ onLogout, onBack }: AdminPanelProps) {
  const { data: products, isLoading, isError } = useAllProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const handleFormSubmit = async (data: {
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    category: string;
    affiliateLink: string;
    featured: boolean;
  }) => {
    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({ id: editingProduct.id, ...data });
        toast.success("Product updated successfully");
      } else {
        await addProduct.mutateAsync(data);
        toast.success("Product added successfully");
      }
      setFormOpen(false);
      setEditingProduct(null);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProduct.mutateAsync(deleteTarget.id);
      toast.success(`"${deleteTarget.name}" deleted.`);
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const openAdd = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const skeletonRows = ["a", "b", "c", "d", "e"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <span className="font-display italic text-xl font-semibold text-foreground">
                Maison
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-sans">
                Admin Panel
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBack}
                className="hidden sm:flex items-center gap-1 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="admin.view_site_link"
              >
                <ExternalLink className="w-3 h-3" />
                View Site
              </button>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="text-xs uppercase tracking-wider h-8 gap-2"
                data-ocid="admin.logout_button"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-medium text-foreground">
              Products
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isLoading
                ? "Loading…"
                : `${products?.length ?? 0} product${
                    products?.length !== 1 ? "s" : ""
                  } total`}
            </p>
          </div>
          <Button
            onClick={openAdd}
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs uppercase tracking-wider h-10 gap-2"
            data-ocid="admin.add_product_button"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        {/* Table */}
        <div className="border border-border bg-card overflow-hidden">
          {isError && (
            <div
              className="p-8 text-center"
              data-ocid="admin.products.error_state"
            >
              <p className="text-sm text-destructive">
                Failed to load products. Please refresh.
              </p>
            </div>
          )}

          {isLoading && (
            <div
              className="p-4 space-y-3"
              data-ocid="admin.products.loading_state"
            >
              {skeletonRows.map((key) => (
                <Skeleton key={key} className="h-12 w-full" />
              ))}
            </div>
          )}

          {!isLoading && !isError && products?.length === 0 && (
            <div
              className="py-20 text-center"
              data-ocid="admin.products.empty_state"
            >
              <p className="font-display italic text-2xl text-muted-foreground mb-2">
                No products yet
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Add your first product to get started.
              </p>
              <Button
                onClick={openAdd}
                variant="outline"
                className="text-xs uppercase tracking-wider"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          )}

          {!isLoading && !isError && (products?.length ?? 0) > 0 && (
            <Table data-ocid="admin.products.table">
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-medium w-[200px]">
                    Name
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Category
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Price
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-medium hidden md:table-cell">
                    Affiliate Link
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-medium text-center">
                    Featured
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-medium text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product, i) => (
                  <TableRow
                    key={product.id.toString()}
                    className="border-border hover:bg-muted/30"
                    data-ocid={`admin.product.item.${i + 1}`}
                  >
                    <TableCell className="font-medium text-foreground text-sm">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          product.category === "Fashion"
                            ? "category-badge-fashion"
                            : "category-badge-home-decor"
                        }`}
                      >
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {product.price}
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-[180px]">
                      <a
                        href={product.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent hover:underline truncate block max-w-[160px]"
                        title={product.affiliateLink}
                      >
                        {product.affiliateLink
                          ? product.affiliateLink
                              .replace(/^https?:\/\//, "")
                              .slice(0, 30) +
                            (product.affiliateLink.length > 30 ? "…" : "")
                          : "—"}
                      </a>
                    </TableCell>
                    <TableCell className="text-center">
                      {product.featured && (
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => openEdit(product)}
                          data-ocid={`admin.product.edit_button.${i + 1}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => setDeleteTarget(product)}
                          data-ocid={`admin.product.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>

      {/* Dialogs */}
      <ProductFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleFormSubmit}
        isPending={addProduct.isPending || updateProduct.isPending}
        product={editingProduct}
      />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        productName={deleteTarget?.name ?? ""}
        isPending={deleteProduct.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
