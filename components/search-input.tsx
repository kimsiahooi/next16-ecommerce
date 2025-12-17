"use client";

import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";

export default function SearchInput() {
	const searchParams = useSearchParams();

	const initialQuery = searchParams.get("query") ?? "";

	const [query, setQuery] = useState(initialQuery);
	const router = useRouter();

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();

		const trimmedQuery = query.trim();
		const params = new URLSearchParams();

		if (trimmedQuery) {
			params.set("query", trimmedQuery);
			router.push(`/search?${params.toString()}`);
		} else {
			router.push("/search");
		}
	};

	useEffect(() => {
		setQuery(initialQuery);
	}, [initialQuery]);

	return (
		<form className="relative w-full" onSubmit={handleSearch}>
			<SearchIcon className="absolute size-4 text-muted-foreground left-2.5 top-1/2 -translate-y-1/2" />
			<Input
				type="search"
				placeholder="Search"
				className="pl-8"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
		</form>
	);
}
