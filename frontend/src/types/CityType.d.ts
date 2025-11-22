export type User = {
	userId: number;
	email: string;
	roles: string[];
	userInfo?: UserInfo;
}

export type City = {
	cityId: number;
	cityName: string;
	description: string;
	imageUrl: string;
	cityLatitude: number;
	cityLongitude: number;
	createdAt?: string | null;
	updatedAt?: string | null;
}