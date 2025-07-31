import {gql} from "@apollo/client";

export const GET_ALL_USERS = gql`
    query GetAllUsers {
        getAllUsers {
            id
        }
    }
`;

export const SIGNUP = gql`
    mutation Signup($data: NewUserInput!) {
        signup(data: $data)
    }
`;