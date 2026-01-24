import { Suspense } from "react";
import Breadcrumbs from "@/components/breadcrumb/breadcrumbs";
import ProductCard from "@/components/product/ProductCard";
import ProductsSkeleton from "@/components/product/ProductsSkeleton";
import { prisma } from "@/lib/prisma";
import type { SearchParams } from "@/types";

async function Products({ query }: { query: string }) {
  const products = await prisma.product.findMany({
    where: {
      OR: [{ name: { contains: query } }, { description: { contains: query } }],
    },
    take: 18,
  });

  if (!products.length) {
    return (
      <div className="text-center text-muted-foreground">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams<{
    query?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params.query?.trim() ?? "";

  const breadcrumbs = [
    { label: "Products", href: "/" },
    {
      label: `Results for ${query}`,
      href: `/search?query=${encodeURIComponent(query)}`,
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <Suspense key={query} fallback={<ProductsSkeleton />}>
        <Products query={query} />
      </Suspense>
    </>
  );
}
