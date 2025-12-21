import { notFound } from "next/navigation";
import { Suspense } from "react";
import Breadcrumbs from "@/components/breadcrumb/breadcrumbs";
import ProductCard from "@/components/product/ProductCard";
import ProductsSkeleton from "@/components/product/ProductsSkeleton";
import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/utils";

async function Products({ slug }: { slug: string }) {
	const products = await prisma.product.findMany({
		where: {
			category: {
				slug,
			},
		},
		take: 18,
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
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

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

			<Suspense key={slug} fallback={<ProductsSkeleton />}>
				<Products slug={slug} />
			</Suspense>
		</main>
	);
}
