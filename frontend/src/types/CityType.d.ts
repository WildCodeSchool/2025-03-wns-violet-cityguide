export type User = {
    userId: number;
    email: string;
    roles: string[];
    userInfo?: UserInfo;
}

export type City = {
    cityId: number;
    cityName: string;
    createdAt?: string | null;
    description: string;
    imageUrl: string;
    updatedAt?: string | null;
    createdBy: User;
}