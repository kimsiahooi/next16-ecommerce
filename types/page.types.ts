export type SearchParams<
	T extends { [key: string]: string | string[] | undefined } = {
		[key: string]: string | string[] | undefined;
	},
> = Promise<T>;

export type Params<T extends Record<string, string>> = Promise<T>;
