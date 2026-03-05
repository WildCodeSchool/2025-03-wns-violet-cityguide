import { Category } from "../generated/graphql-types";

export interface GetCategory {
	categoryName : string, 
	categoryId: number
}

export interface CreateCategory {
	categoryName: string
}