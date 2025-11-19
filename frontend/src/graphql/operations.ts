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

export const GET_ALL_CITIES = gql`
    query GetAllCities {
        getAllCities {
            cityId
            cityName
            createdAt
            description
            imageUrl
            updatedAt
            createdBy {
                userInfo {
                    avatarUrl
                    firstName
                    lastName
                }
            }
        }
    }
`;

export const GET_ONE_CITY = gql`
    query GetOneCity($getCityByIdId: Float!) {
        getCityById(id: $getCityByIdId) {
            cityId
            cityName
            description
            imageUrl
            cityRate {
                rate
            }
            cityPois {
                poiName
            }
        }
    }
`;