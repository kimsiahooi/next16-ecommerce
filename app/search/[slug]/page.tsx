import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";
import Breadcrumbs from "@/components/breadcrumb/breadcrumbs";
import ProductCard from "@/components/product/ProductCard";
import ProductsSkeleton from "@/components/product/ProductsSkeleton";
import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import type { Params, SearchParams } from "@/types";

enum Sort {
	PRICE_ASC = "price-asc",
	PRICE_DESC = "price-desc",
}

async function Products({ slug, sort }: { slug: string; sort?: Sort }) {
	let orderBy: Record<string, SortOrder> = {};

	switch (sort) {
		case Sort.PRICE_ASC:
			orderBy = {
				price: "asc",
			};
			break;
		case Sort.PRICE_DESC:
			orderBy = {
				price: "desc",
			};
			break;
	}

	const products = await prisma.product.findMany({
		where: {
			category: {
				slug,
			},
		},
		take: 18,
		orderBy: { ...orderBy },
	});

	await sleep(1000);

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

export default async function SearchCategoryPage({
	params,
	searchParams,
}: {
	params: Params<{ slug: string }>;
	searchParams: SearchParams<{ sort?: Sort }>;
}) {
	const { slug } = await params;
	const { sort } = await searchParams;

	const category = await prisma.category.findUnique({
		where: {
			slug,
		},
		select: {
			id: true,
			name: true,
			slug: true,
		},
	});

	if (!category) {
		notFound();
	}

	const breadcrumbs = [
		{ label: "Products", href: "/" },
		{
			label: category.name,
			href: `/search/${category.slug}`,
		},
	];

	return (
		<main className="container mx-auto py-4">
			<Breadcrumbs items={breadcrumbs} />

			<div className="flex gap-3 text-sm mb-4">
				<Link href={`/search/${slug}`}>Latest</Link>
				<Link href={`/search/${slug}?sort=${Sort.PRICE_ASC}`}>
					Price: Low to High
				</Link>
				<Link href={`/search/${slug}?sort=${Sort.PRICE_DESC}`}>
					Price: High to Low
				</Link>
			</div>

			<Suspense key={`${slug}-${sort}`} fallback={<ProductsSkeleton />}>
				<Products slug={slug} sort={sort} />
			</Suspense>
		</main>
	);
}
