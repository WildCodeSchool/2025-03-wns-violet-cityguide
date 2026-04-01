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
  roles?: Role[];
  userInfo?: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
  } | null;
};

export type UserResponse = {
  token: string;
  user?: GraphqlUser | null;
	roles?: Role[];
  message?: string | null;
};

export type State = {
  user: GraphqlUser | null;
  roles: Role[];
  token: string | null;
  isAuthenticated: boolean;
  isAuthStoreReady: boolean;
};

export type Actions = {
  login: (resp: UserResponse) => void;
  logout: () => void;
};
