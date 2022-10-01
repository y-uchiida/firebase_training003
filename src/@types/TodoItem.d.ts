export interface TodoItem {
	id: string | null,
	uid: string,
	title: string,
	isComplete: boolean,
	country: string,
	createdAt: Date | null
}
