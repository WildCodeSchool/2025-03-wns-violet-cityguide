export type User = {
    userId: number;
    email: string;
    roles: string[];
    userInfo: UserInfo;
}

export type City = {
    cityId: number;
    cityName: string;
    createdAt: string;
    description: string;
    imageUrl: string;
    updatedAt: string;
    createdBy: User;
}