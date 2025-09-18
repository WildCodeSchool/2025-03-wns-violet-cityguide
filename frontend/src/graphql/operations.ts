import {gql} from "@apollo/client";

export const GET_ALL_USERS = gql`
query GetAllUsers {
  getAllUsers {
    userId
    email
    roles
    userInfos {
      firstName
      lastName
      avatarUrl
    }
  }
}
`;

export const SIGNUP = gql`
    mutation Signup($data: NewUserInput!) {
        signup(data: $data)
    }
`;