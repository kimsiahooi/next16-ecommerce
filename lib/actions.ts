"use server";

import {
  type ProductWhereInput,
  SortOrder,
} from "@/app/generated/prisma/internal/prismaNamespace";
import { Sort } from "@/types";
import { prisma } from "./prisma";

export async function getProducts({
  query,
  slug,
  sort,
  page = 1,
  pageSize = 3,
}: {
  query?: string;
  slug?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
}) {
  const where: ProductWhereInput = {};

  if (query) {
    where.OR = [
      { name: { contains: query } },
      { description: { contains: query } },
    ];
  }

  if (slug) {
    where.category = { slug };
  }

  let orderBy: Record<string, SortOrder> = {};

  switch (sort) {
    case Sort.PRICE_ASC:
      orderBy = {
        price: SortOrder.asc,
      };
      break;
    case Sort.PRICE_DESC:
      orderBy = {
        price: SortOrder.desc,
      };
      break;
  }

  return await prisma.product.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  return product;
}
