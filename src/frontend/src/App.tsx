import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { AboutSection } from "./components/AboutSection";
import { FeaturedSection } from "./components/FeaturedSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { ProductsSection } from "./components/ProductsSection";
import { useActor } from "./hooks/useActor";
import { useAllProducts, useFeaturedProducts } from "./hooks/useQueries";

const queryClient = new QueryClient();

function AppContent() {
  const { actor, isFetching } = useActor();
  const seededRef = useRef(false);
  const allProducts = useAllProducts();
  const featuredProducts = useFeaturedProducts();
  const refetchAll = allProducts.refetch;
  const refetchFeatured = featuredProducts.refetch;

  useEffect(() => {
    if (actor && !isFetching && !seededRef.current) {
      seededRef.current = true;
      actor.seed().then(() => {
        refetchAll();
        refetchFeatured();
      });
    }
  }, [actor, isFetching, refetchAll, refetchFeatured]);

  const scrollTo = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isLoading = allProducts.isLoading || isFetching;
  const isFeaturedLoading = featuredProducts.isLoading || isFetching;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={scrollTo} />
      <main className="flex-1">
        <HeroSection onBrowse={() => scrollTo("products")} />
        <FeaturedSection
          products={featuredProducts.data ?? []}
          isLoading={isFeaturedLoading}
        />
        <ProductsSection
          products={allProducts.data ?? []}
          isLoading={isLoading}
        />
        <AboutSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
