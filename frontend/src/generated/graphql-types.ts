import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  categoryId: Scalars['Float']['output'];
  categoryName: Scalars['String']['output'];
  categoryPois?: Maybe<Array<Poi>>;
  style: Scalars['String']['output'];
};

export type CategoryInput = {
  categoryName: Scalars['String']['input'];
  style: Scalars['String']['input'];
};

export type City = {
  __typename?: 'City';
  cityId: Scalars['Float']['output'];
  cityLatitude: Scalars['Float']['output'];
  cityLongitude: Scalars['Float']['output'];
  cityName: Scalars['String']['output'];
  cityPois?: Maybe<Array<Poi>>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type CreateCityInput = {
  cityLatitude: Scalars['Float']['input'];
  cityLongitude: Scalars['Float']['input'];
  cityName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Scalars['ID']['output'];
  createCity: Scalars['ID']['output'];
  createPoi: Scalars['ID']['output'];
  deleteCategory: Scalars['ID']['output'];
  deleteCity: Scalars['ID']['output'];
  deletePoi: Scalars['ID']['output'];
  deleteUser: Scalars['ID']['output'];
  login: UserResponse;
  logout: UserResponse;
  signup: UserResponse;
  updateCategory: Scalars['ID']['output'];
  updateCity: Scalars['ID']['output'];
  updatePoi: Scalars['ID']['output'];
  updateUser: Scalars['ID']['output'];
  updateUserInfo: Scalars['ID']['output'];
};


export type MutationCreateCategoryArgs = {
  data: CategoryInput;
};


export type MutationCreateCityArgs = {
  data: CreateCityInput;
};


export type MutationCreatePoiArgs = {
  data: PoiInput;
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['Float']['input'];
};


export type MutationDeleteCityArgs = {
  cityId: Scalars['Float']['input'];
};


export type MutationDeletePoiArgs = {
  poiId: Scalars['Float']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  data: UserInput;
};


export type MutationSignupArgs = {
  data: NewUserInput;
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['Float']['input'];
  data: CategoryInput;
};


export type MutationUpdateCityArgs = {
  cityId: Scalars['Float']['input'];
  data: UpdateCityInput;
};


export type MutationUpdatePoiArgs = {
  data: PoiInput;
  poiId: Scalars['Float']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  userId: Scalars['Float']['input'];
};


export type MutationUpdateUserInfoArgs = {
  data: UserInfoInput;
  userInfoId: Scalars['Float']['input'];
};

export type NewUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Poi = {
  __typename?: 'Poi';
  address: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  externalLink: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  poiCategory?: Maybe<Category>;
  poiCity: City;
  poiDescription: Scalars['String']['output'];
  poiId: Scalars['Float']['output'];
  poiLatitude: Scalars['Float']['output'];
  poiLongitude: Scalars['Float']['output'];
  poiName: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type PoiInput = {
  address: Scalars['String']['input'];
  externalLink: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  poiCategory: Scalars['ID']['input'];
  poiCity: Scalars['ID']['input'];
  poiDescription: Scalars['String']['input'];
  poiLatitude: Scalars['Float']['input'];
  poiLongitude: Scalars['Float']['input'];
  poiName: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllCategories: Array<Category>;
  getAllCities: Array<City>;
  getAllPois: Array<Poi>;
  getAllUserInfos: Array<UserInfo>;
  getAllUsers: Array<User>;
  getCategoryById: Category;
  getCityById: City;
  getPoiById: Poi;
  getPoisByCategory: Array<Poi>;
  getPoisByCity: Array<Poi>;
  getPoisByCityAndCategory: Array<Poi>;
  getUserById?: Maybe<User>;
  getUserInfoByUserId: UserInfo;
};


export type QueryGetCategoryByIdArgs = {
  categoryId: Scalars['Float']['input'];
};


export type QueryGetCityByIdArgs = {
  cityId: Scalars['Float']['input'];
};


export type QueryGetPoiByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetPoisByCategoryArgs = {
  categoryId: Scalars['Float']['input'];
};


export type QueryGetPoisByCityArgs = {
  cityId: Scalars['Float']['input'];
};


export type QueryGetPoisByCityAndCategoryArgs = {
  categoryId: Scalars['Float']['input'];
  cityId: Scalars['Float']['input'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserInfoByUserIdArgs = {
  userId: Scalars['Float']['input'];
};

/** Roles for users in this app */
export enum Role {
  AdminCity = 'ADMIN_CITY',
  AdminSite = 'ADMIN_SITE',
  PoiCreator = 'POI_CREATOR',
  User = 'USER'
}

export type UpdateCityInput = {
  description: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
};

export type UpdateUserInput = {
  roles: Array<Role>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  hashedPassword: Scalars['String']['output'];
  roles: Array<Role>;
  userId: Scalars['Float']['output'];
  userInfo?: Maybe<UserInfo>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  avatarUrl: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  user: User;
  userInfoId: Scalars['Float']['output'];
};

export type UserInfoInput = {
  avatarUrl: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  message?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', userId: number, email: string, roles: Array<Role>, userInfo?: { __typename?: 'UserInfo', firstName: string, lastName: string, avatarUrl: string } | null }> };

export type SignupMutationVariables = Exact<{
  data: NewUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'UserResponse', token: string, message?: string | null, user?: { __typename?: 'User', userId: number, email: string, roles: Array<Role> } | null } };

export type LoginMutationVariables = Exact<{
  data: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', token: string, user?: { __typename?: 'User', userId: number, email: string } | null } };

export type GetAllCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCitiesQuery = { __typename?: 'Query', getAllCities: Array<{ __typename?: 'City', cityId: number, cityName: string, imageUrl: string, description: string, cityLatitude: number, cityLongitude: number }> };

export type GetOneCityQueryVariables = Exact<{
  getCityByIdId: Scalars['Float']['input'];
}>;


export type GetOneCityQuery = { __typename?: 'Query', getCityById: { __typename?: 'City', cityId: number, cityName: string, imageUrl: string, description: string } };

export type GetAllPoisQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPoisQuery = { __typename?: 'Query', getAllPois: Array<{ __typename?: 'Poi', poiName: string, poiLongitude: number, poiLatitude: number, imageUrl: string, externalLink: string, poiDescription: string, address: string, poiCategory?: { __typename?: 'Category', style: string, categoryName: string } | null }> };

export type GetPoiByIdQueryVariables = Exact<{
  getPoiByIdId: Scalars['Float']['input'];
}>;


export type GetPoiByIdQuery = { __typename?: 'Query', getPoiById: { __typename?: 'Poi', address: string, externalLink: string, imageUrl: string, poiDescription: string, poiId: number, poiLatitude: number, poiLongitude: number, poiName: string, poiCity: { __typename?: 'City', cityId: number }, poiCategory?: { __typename?: 'Category', categoryName: string } | null } };

export type GetPoisByCityQueryVariables = Exact<{
  cityId: Scalars['Float']['input'];
}>;


export type GetPoisByCityQuery = { __typename?: 'Query', getPoisByCity: Array<{ __typename?: 'Poi', address: string, externalLink: string, imageUrl: string, poiDescription: string, poiId: number, poiLatitude: number, poiLongitude: number, poiName: string, poiCategory?: { __typename?: 'Category', categoryName: string } | null, poiCity: { __typename?: 'City', cityName: string } }> };


export const GetAllUsersDocument = gql`
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

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const SignupDocument = gql`
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
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LoginDocument = gql`
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetAllCitiesDocument = gql`
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

/**
 * __useGetAllCitiesQuery__
 *
 * To run a query within a React component, call `useGetAllCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCitiesQuery, GetAllCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCitiesQuery, GetAllCitiesQueryVariables>(GetAllCitiesDocument, options);
      }
export function useGetAllCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCitiesQuery, GetAllCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCitiesQuery, GetAllCitiesQueryVariables>(GetAllCitiesDocument, options);
        }
export function useGetAllCitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCitiesQuery, GetAllCitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCitiesQuery, GetAllCitiesQueryVariables>(GetAllCitiesDocument, options);
        }
export type GetAllCitiesQueryHookResult = ReturnType<typeof useGetAllCitiesQuery>;
export type GetAllCitiesLazyQueryHookResult = ReturnType<typeof useGetAllCitiesLazyQuery>;
export type GetAllCitiesSuspenseQueryHookResult = ReturnType<typeof useGetAllCitiesSuspenseQuery>;
export type GetAllCitiesQueryResult = Apollo.QueryResult<GetAllCitiesQuery, GetAllCitiesQueryVariables>;
export const GetOneCityDocument = gql`
    query GetOneCity($getCityByIdId: Float!) {
  getCityById(cityId: $getCityByIdId) {
    cityId
    cityName
    imageUrl
    description
  }
}
    `;

/**
 * __useGetOneCityQuery__
 *
 * To run a query within a React component, call `useGetOneCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneCityQuery({
 *   variables: {
 *      getCityByIdId: // value for 'getCityByIdId'
 *   },
 * });
 */
export function useGetOneCityQuery(baseOptions: Apollo.QueryHookOptions<GetOneCityQuery, GetOneCityQueryVariables> & ({ variables: GetOneCityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneCityQuery, GetOneCityQueryVariables>(GetOneCityDocument, options);
      }
export function useGetOneCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneCityQuery, GetOneCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneCityQuery, GetOneCityQueryVariables>(GetOneCityDocument, options);
        }
export function useGetOneCitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneCityQuery, GetOneCityQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOneCityQuery, GetOneCityQueryVariables>(GetOneCityDocument, options);
        }
export type GetOneCityQueryHookResult = ReturnType<typeof useGetOneCityQuery>;
export type GetOneCityLazyQueryHookResult = ReturnType<typeof useGetOneCityLazyQuery>;
export type GetOneCitySuspenseQueryHookResult = ReturnType<typeof useGetOneCitySuspenseQuery>;
export type GetOneCityQueryResult = Apollo.QueryResult<GetOneCityQuery, GetOneCityQueryVariables>;
export const GetAllPoisDocument = gql`
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

/**
 * __useGetAllPoisQuery__
 *
 * To run a query within a React component, call `useGetAllPoisQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPoisQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPoisQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPoisQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPoisQuery, GetAllPoisQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPoisQuery, GetAllPoisQueryVariables>(GetAllPoisDocument, options);
      }
export function useGetAllPoisLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPoisQuery, GetAllPoisQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPoisQuery, GetAllPoisQueryVariables>(GetAllPoisDocument, options);
        }
export function useGetAllPoisSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllPoisQuery, GetAllPoisQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllPoisQuery, GetAllPoisQueryVariables>(GetAllPoisDocument, options);
        }
export type GetAllPoisQueryHookResult = ReturnType<typeof useGetAllPoisQuery>;
export type GetAllPoisLazyQueryHookResult = ReturnType<typeof useGetAllPoisLazyQuery>;
export type GetAllPoisSuspenseQueryHookResult = ReturnType<typeof useGetAllPoisSuspenseQuery>;
export type GetAllPoisQueryResult = Apollo.QueryResult<GetAllPoisQuery, GetAllPoisQueryVariables>;
export const GetPoiByIdDocument = gql`
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

/**
 * __useGetPoiByIdQuery__
 *
 * To run a query within a React component, call `useGetPoiByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoiByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoiByIdQuery({
 *   variables: {
 *      getPoiByIdId: // value for 'getPoiByIdId'
 *   },
 * });
 */
export function useGetPoiByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPoiByIdQuery, GetPoiByIdQueryVariables> & ({ variables: GetPoiByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPoiByIdQuery, GetPoiByIdQueryVariables>(GetPoiByIdDocument, options);
      }
export function useGetPoiByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPoiByIdQuery, GetPoiByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPoiByIdQuery, GetPoiByIdQueryVariables>(GetPoiByIdDocument, options);
        }
export function useGetPoiByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPoiByIdQuery, GetPoiByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPoiByIdQuery, GetPoiByIdQueryVariables>(GetPoiByIdDocument, options);
        }
export type GetPoiByIdQueryHookResult = ReturnType<typeof useGetPoiByIdQuery>;
export type GetPoiByIdLazyQueryHookResult = ReturnType<typeof useGetPoiByIdLazyQuery>;
export type GetPoiByIdSuspenseQueryHookResult = ReturnType<typeof useGetPoiByIdSuspenseQuery>;
export type GetPoiByIdQueryResult = Apollo.QueryResult<GetPoiByIdQuery, GetPoiByIdQueryVariables>;
export const GetPoisByCityDocument = gql`
    query GetPoisByCity($cityId: Float!) {
  getPoisByCity(cityId: $cityId) {
    address
    externalLink
    imageUrl
    poiCategory {
      categoryName
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

/**
 * __useGetPoisByCityQuery__
 *
 * To run a query within a React component, call `useGetPoisByCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoisByCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoisByCityQuery({
 *   variables: {
 *      cityId: // value for 'cityId'
 *   },
 * });
 */
export function useGetPoisByCityQuery(baseOptions: Apollo.QueryHookOptions<GetPoisByCityQuery, GetPoisByCityQueryVariables> & ({ variables: GetPoisByCityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPoisByCityQuery, GetPoisByCityQueryVariables>(GetPoisByCityDocument, options);
      }
export function useGetPoisByCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPoisByCityQuery, GetPoisByCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPoisByCityQuery, GetPoisByCityQueryVariables>(GetPoisByCityDocument, options);
        }
export function useGetPoisByCitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPoisByCityQuery, GetPoisByCityQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPoisByCityQuery, GetPoisByCityQueryVariables>(GetPoisByCityDocument, options);
        }
export type GetPoisByCityQueryHookResult = ReturnType<typeof useGetPoisByCityQuery>;
export type GetPoisByCityLazyQueryHookResult = ReturnType<typeof useGetPoisByCityLazyQuery>;
export type GetPoisByCitySuspenseQueryHookResult = ReturnType<typeof useGetPoisByCitySuspenseQuery>;
export type GetPoisByCityQueryResult = Apollo.QueryResult<GetPoisByCityQuery, GetPoisByCityQueryVariables>;