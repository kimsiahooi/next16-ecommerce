"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { Category } from "@/app/generated/prisma/client";

type Props = {
  categories: Pick<Category, "id" | "name" | "slug">[];
};

export default function CategorySidebar({ categories }: Props) {
  const params = useParams<{ slug: string }>();

  return (
    <div className="w-31.25 flex-none">
      <h3 className="text-xs text-muted-foreground mb-2">Collections</h3>

      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/search/${category.slug}`}
              className={`text-sm hover:text-primary ${params.slug === category.slug ? "underline" : ""}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
