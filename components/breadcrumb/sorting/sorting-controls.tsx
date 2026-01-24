"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sort } from "@/types";

export default function SortingControls() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");

  const createSortUrl = (sortValue: Sort | null): string => {
    const params = new URLSearchParams(searchParams.toString());

    if (sortValue) {
      params.set("sort", sortValue);
    } else {
      params.delete("sort");
    }

    const queryString = params.toString();

    return `${pathname}?${queryString ?? ""}`;
  };

  return (
    <>
      <h3 className="text-xs text-muted-foreground mb-2"> Sort By </h3>

      <ul>
        <li>
          <Link
            href={createSortUrl(null)}
            className={cn(
              "text-sm hover:text-primary",
              !currentSort ? "underline" : "",
            )}>
            Latest
          </Link>
        </li>
        <li>
          <Link
            href={createSortUrl(Sort.PRICE_ASC)}
            className={cn(
              "text-sm hover:text-primary",
              currentSort === Sort.PRICE_ASC ? "underline" : "",
            )}>
            Price: Low to High
          </Link>
        </li>
        <li>
          <Link
            href={createSortUrl(Sort.PRICE_DESC)}
            className={cn(
              "text-sm hover:text-primary",
              currentSort === Sort.PRICE_DESC ? "underline" : "",
            )}>
            Price: High to Low
          </Link>
        </li>
      </ul>
    </>
  );
}
