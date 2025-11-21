import {gql} from "@apollo/client";

export const GET_ALL_USERS = gql`
query GetAllUsers {
  getAllUsers {
    userId
    email
    roles
    userInfo {
      firstName
      lastName
      avatarUrl
    }
  }
}
`;

export const SIGNUP = gql`
    mutation Signup($data: NewUserInput!) {
        signup(data: $data) {
            token
            message
            user {
                userId
                email
                roles
            }
        }
    }
`;

export const LOGIN = gql `
  mutation Login($data: UserInput!) {
  login(data: $data) {
    token
    user {
      userId
      email
    }
  }
}
`;

// export const GET_ALL_CITIES = gql`
//     query GetAllCities {
//         getAllCities {
//             cityId
//             cityName
//             createdAt
//             description
//             imageUrl
//             updatedAt
//             cityLatitude
//             cityLongitude   
//         }
//     }
// `;