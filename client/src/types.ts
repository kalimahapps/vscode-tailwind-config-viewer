type TailwindClassData = {
	[key: string]: string | TailwindClassData | Record<string, TailwindClassData>;
};

export type {
	TailwindClassData
};