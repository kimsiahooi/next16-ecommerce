import BreadcrumbsSkeleton from "@/components/breadcrumb/breadcrumbs-skeleton";
import ProductsSkeleton from "@/components/product/ProductsSkeleton";

export default function Loading() {
  return (
    <main className="container mx-auto py-4">
      <BreadcrumbsSkeleton />
      <ProductsSkeleton />
    </main>
  );
}
