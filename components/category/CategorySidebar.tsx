import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/utils";

export default async function CategorySidebar({
	activeCategory,
}: {
	activeCategory?: string;
}) {
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

	return (
		<div className="w-31.25 flex-none">
			<h3 className="text-xs text-muted-foreground mb-2">Collections</h3>

			<ul>
				{categories.map((category) => (
					<li key={category.id}>
						<Link
							href={`/search/${category.slug}`}
							className={`text-sm hover:text-primary ${activeCategory === category.slug ? "underline" : ""}`}
						>
							{category.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
