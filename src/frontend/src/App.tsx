import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { FeaturedSection } from "./components/FeaturedSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { ProductsSection } from "./components/ProductsSection";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminPanel } from "./components/admin/AdminPanel";
import { useActor } from "./hooks/useActor";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useAllProducts, useFeaturedProducts } from "./hooks/useQueries";

const queryClient = new QueryClient();

type Page = "home" | "admin";

function AppContent() {
  const { actor, isFetching } = useActor();
  const { login, clear, identity, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const seededRef = useRef(false);
  const allProducts = useAllProducts();
  const featuredProducts = useFeaturedProducts();
  const refetchAll = allProducts.refetch;
  const refetchFeatured = featuredProducts.refetch;

  // Hash-based routing
  const [page, setPage] = useState<Page>(() =>
    window.location.hash === "#/admin" ? "admin" : "home",
  );

  useEffect(() => {
    const handler = () => {
      setPage(window.location.hash === "#/admin" ? "admin" : "home");
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigateTo = (p: Page) => {
    window.location.hash = p === "admin" ? "#/admin" : "";
    setPage(p);
  };

  // Seed only when count is 0
  useEffect(() => {
    if (actor && !isFetching && !seededRef.current) {
      seededRef.current = true;
      actor.getProductCount().then((count) => {
        if (count === BigInt(0)) {
          actor.seed().then(() => {
            refetchAll();
            refetchFeatured();
          });
        }
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

  if (page === "admin") {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onLogin={login}
          isLoggingIn={isLoggingIn}
          onBack={() => navigateTo("home")}
        />
      );
    }
    return (
      <AdminPanel
        onLogout={() => {
          clear();
          navigateTo("home");
        }}
        onBack={() => navigateTo("home")}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={scrollTo} onAdminClick={() => navigateTo("admin")} />
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
