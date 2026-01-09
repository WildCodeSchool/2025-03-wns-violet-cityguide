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
			roles
		}
	}
}
`;

export const GET_ALL_CITIES = gql`
	query GetAllCities {
		getAllCities {
		cityId
		cityName
		imageUrl
		description
		cityLatitude
		cityLongitude
	}
}
`;

// Pois à dé-commenter lorsque la requête sera ok
export const GET_ONE_CITY = gql`
	query GetOneCity($getCityByIdId: Float!) {
		getCityById(cityId: $getCityByIdId) {
			cityId
			cityName
			imageUrl
			description
			# cityPois {
			# poiName
			# }
		}
	}
`;

export const UPDATE_ONE_CITY = gql`
	mutation UpdateOneCity($data: UpdateCityInput!, $cityId: Float!) {		
		updateCity(data: $data, cityId: $cityId)
}
`

export const GET_ALL_POIS = gql`
	query GetAllPois {
		getAllPois {
			poiName
			poiLongitude
			poiLatitude
			imageUrl
			externalLink
			poiDescription
			address
			poiCategory {
				style
				categoryName
			}
		}
	}
`;

export const GET_POI_BY_ID = gql`
	query GetPoiById($getPoiByIdId: Float!) {
        getPoiById(id: $getPoiByIdId) {
            address
            poiCity {
                cityId
            }
            externalLink
            imageUrl
            poiCategory {
                categoryName
            }
            poiDescription
            poiId
            poiLatitude
            poiLongitude
            poiName
        }
	}
`;

export const GET_POIS_BY_CITY = gql`
query GetPoisByCity($cityId: Float!) {
  getPoisByCity(cityId: $cityId) {
    address
    externalLink
    imageUrl
    poiCategory {
      categoryName
	  style
    }
  }
}
`;

// categorie ! 
export const GET_ALL_CATEGORIES = gql`
	query GetAllCategories {
		getAllCategories {
		categoryName, 
		categoryId, 
		style
		}
	}
`
export const CREATE_CATEGORY = gql`
	mutation CreateCategory($data: CategoryInput!) {
  createCategory(data: $data)
}
`

export const UPDATE_CATEGORY = gql`
	mutation UpdateCategory($data: CategoryInput!, $categoryId: Float!) {
		updateCategory(data: $data, categoryId: $categoryId)
	}
`
// Users !
// get all users (for sysadmin)
// export const GET_ALL_USERS