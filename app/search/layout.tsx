import { type ReactNode, Suspense } from "react";
import CategorySidebar from "@/components/category/CategorySidebar";
import SortingControls from "@/components/sorting/SortingControls";
import { prisma } from "@/lib/prisma";

async function CategorySidebarServerWrapper() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return <CategorySidebar categories={categories} />;
}

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <main className="container mx-auto py-4">
      <div className="flex gap-8">
        <div className="w-31.25 flex-none">
          <Suspense fallback={<div className="w-31.25">Loading...</div>}>
            <CategorySidebarServerWrapper />
          </Suspense>
        </div>
        <div className="flex-1">{children}</div>
        <div className="w-31.25 flex-none">
          <SortingControls />
        </div>
      </div>
    </main>
  );
}
