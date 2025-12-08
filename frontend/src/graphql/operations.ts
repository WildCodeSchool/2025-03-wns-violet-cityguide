import { gql } from "@apollo/client";

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

export const LOGIN = gql`
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

// categorie ! 
export const GET_ALL_CATEGORIES = gql`
	query GetAllCategories {
		getAllCategories {
		categoryName, 
		categoryId
		}
	}
`

export const CREATE_CATEGORY = gql`
	mutation CreateCategory($data: CategoryInput!) {
  createCategory(data: $data)
}
`