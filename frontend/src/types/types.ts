import { Role } from "../generated/graphql-types";

export type UserProfile = {
    email: string;
    roles: Role[];
};