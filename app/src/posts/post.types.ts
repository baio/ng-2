export interface IPost {
	id: string
	title: string
}

export enum PostsType {
	popular,
	trends,
	feed,
	voted,
	readLater	
}

export interface IPostsFilter {
	type: PostsType
}
