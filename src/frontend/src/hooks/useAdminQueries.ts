import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      imageUrl: string;
      price: string;
      category: string;
      affiliateLink: string;
      featured: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addProduct(
        data.name,
        data.description,
        data.imageUrl,
        data.price,
        data.category,
        data.affiliateLink,
        data.featured,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["featured-products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      description: string;
      imageUrl: string;
      price: string;
      category: string;
      affiliateLink: string;
      featured: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProduct(
        data.id,
        data.name,
        data.description,
        data.imageUrl,
        data.price,
        data.category,
        data.affiliateLink,
        data.featured,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["featured-products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["featured-products"] });
    },
  });
}
