// GraphQL
import { Role } from "../generated/graphql-types";

// Types utilisés dans le context
export type UserProfile = {
    email: string;
    roles: Role[];
};

export type GraphqlUser = {
    userId: number;
    email: string;
    roles?: ("ADMIN" | "USER")[];
    userInfo?: {
        firstName: string;
        lastName: string;
        avatarUrl: string;
    } | null;
};

export type UserResponse = {
    token: string;
    user?: GraphqlUser | null;
    message?: string | null;
};

export type State = {
    user: GraphqlUser | null;
    token: string | null;
    isAuthenticated: boolean;
};

export type Actions = {
    login: (resp: UserResponse) => void;
    logout: () => void;
};