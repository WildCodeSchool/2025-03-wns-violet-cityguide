import { Role } from "../generated/graphql-types";

// Types utilisés dans le context
export interface UserProfile {
    email: string;
    roles: Role[];
};

export interface GraphqlUser {
    userId: number;
    email: string;
    roles?: ("ADMIN" | "USER")[];
    userInfo?: {
        firstName: string;
        lastName: string;
        avatarUrl: string;
    } | null;
};

export interface UserResponse {
    token: string;
    user?: GraphqlUser | null;
    message?: string | null;
};

export interface State {
    user: GraphqlUser | null;
    token: string | null;
    isAuthenticated: boolean;
};

export interface Actions {
    login: (resp: UserResponse) => void;
    logout: () => void;
};