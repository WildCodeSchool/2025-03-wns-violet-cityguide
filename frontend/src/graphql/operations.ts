import { gql } from "@apollo/client";

// UTILISATEURS
export const GET_ALL_USERS = gql`
query GetAllUsers {
	getAllUsers {
		userId
		email
		roles
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

export const GET_USER_BY_ID = gql`
	query GetUserById($userId: ID!) {
		getUserById(userId: $userId) {
			userId
			email
			roles
		}
	}
`;

export const UPDATE_USER_ROLE = gql`
	mutation UpdateUserRole($data: UpdateUserRoleInput!, $userId: Float!) {
		updateUserRole(data: $data, userId: $userId)
	}
`;

// Mail (plus tard password)
export const UPDATE_USER_DATA = gql`
	mutation UpdateUserData($data: UpdateUserDataInput!, $userId: Float!) {
		updateUserData(data: $data, userId: $userId)
	}
`;

export const DELETE_USER_BY_ID = gql`
	mutation DeleteUserByID($userId: Float!) {
		deleteUser(userId: $userId)
	}
`;

export const GET_ALL_USER_INFO = gql`
	query getAllUserInfos {
		getAllUserInfos {
			user {
				userId
			}
			userInfoId
			firstName
			lastName
			avatarUrl
		}
	}
`;

export const GET_USER_INFO_BY_USER_ID = gql`
	query getUserInfoByUserId($userId: Float!) {
		getUserInfoByUserId(userId: $userId) {
			userInfoId
			firstName
			lastName
			avatarUrl
		}
	}
`;

export const UPDATE_USER_INFO = gql`
	mutation UpdateUserInfo($data: UserInfoInput!, $userInfoId: Float!) {
		updateUserInfo(data: $data, userInfoId: $userInfoId)
	}
`;

// VILLES
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
		updateCity(data: $data, cityId: $cityId) {
			cityId
		}
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
				categoryId
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
				categoryId
								categoryName
				style
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
				categoryId
				categoryName
				style
			}
			poiCity {
				cityName
			}
			poiDescription
			poiId
			poiLatitude
			poiLongitude
			poiName
		}
	}
`;

export const ADD_ONE_POI = gql`
	mutation CreatePoi($data: PoiInput!) {
  	createPoi(data: $data)
}
`

export const EDIT_ONE_POI = gql`
	mutation EditPoi($data: PoiInput!, $poiId: Float!) {
  updatePoi(data: $data, poiId: $poiId)
}
`

export const DELETE_ONE_POI = gql`
	mutation DeletePoi($poiId: Float!) {
  deletePoi(poiId: $poiId)
}
`

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

export const DELETE_ONE_CATEGORY = gql`
	mutation DeleteCategory($categoryId: Float!) {
			deleteCategory(categoryId: $categoryId)
}
`

// Users !
// get all users (for sysadmin)
// export const GET_ALL_USERS
export const GET_POIS_BY_CITY_AND_CATEGORY = gql`
		query getPoisByCityAndCategory($categoryId: Float!, $cityId: Float!) {
				getPoisByCityAndCategory(categoryId: $categoryId, cityId: $cityId) {
						address
						externalLink
						imageUrl
						poiCategory {
				categoryId
								style
								categoryName
						}
						poiCity {
								cityName
								cityId
								cityLatitude
								cityLongitude
								description
								imageUrl
						}
						poiDescription
						poiLatitude
						poiLongitude
						poiName
						poiId
				}
		}
`;

export const CREATE_CITY = gql`
	mutation createCity($data: CreateCityInput!) {
	createCity(data: $data)
}
`
