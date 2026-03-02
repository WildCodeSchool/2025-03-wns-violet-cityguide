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
  updateCity: City;
  updatePoi: Scalars['ID']['output'];
  updateUserData: Scalars['ID']['output'];
  updateUserEveryDetail: User;
  updateUserInfo: Scalars['ID']['output'];
  updateUserRole: Scalars['ID']['output'];
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


export type MutationUpdateUserDataArgs = {
  data: UpdateUserDataInput;
  userId: Scalars['Float']['input'];
};


export type MutationUpdateUserEveryDetailArgs = {
  data: UpdateUserEveryDetailsInput;
  userId: Scalars['Float']['input'];
};


export type MutationUpdateUserInfoArgs = {
  data: UserInfoInput;
  userInfoId: Scalars['Float']['input'];
};


export type MutationUpdateUserRoleArgs = {
  data: UpdateUserRoleInput;
  userId: Scalars['Float']['input'];
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
  poiCategory: Scalars['Int']['input'];
  poiCity: Scalars['Int']['input'];
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
  cityLatitude: Scalars['Float']['input'];
  cityLongitude: Scalars['Float']['input'];
  cityName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
};

export type UpdateUserDataInput = {
  email: Scalars['String']['input'];
};

export type UpdateUserEveryDetailsInput = {
  email: Scalars['String']['input'];
  roles: Array<Role>;
  userId: Scalars['Float']['input'];
};

export type UpdateUserRoleInput = {
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


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', userId: number, email: string, roles: Array<Role> }> };

export type SignupMutationVariables = Exact<{
  data: NewUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'UserResponse', token: string, message?: string | null, user?: { __typename?: 'User', userId: number, email: string, roles: Array<Role> } | null } };

export type LoginMutationVariables = Exact<{
  data: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', token: string, user?: { __typename?: 'User', userId: number, email: string, roles: Array<Role> } | null } };

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById?: { __typename?: 'User', userId: number, email: string, roles: Array<Role> } | null };

export type UpdateUserRoleMutationVariables = Exact<{
  data: UpdateUserRoleInput;
  userId: Scalars['Float']['input'];
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole: string };

export type UpdateUserDataMutationVariables = Exact<{
  data: UpdateUserDataInput;
  userId: Scalars['Float']['input'];
}>;


export type UpdateUserDataMutation = { __typename?: 'Mutation', updateUserData: string };

export type DeleteUserByIdMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type DeleteUserByIdMutation = { __typename?: 'Mutation', deleteUser: string };

export type GetAllUserInfosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserInfosQuery = { __typename?: 'Query', getAllUserInfos: Array<{ __typename?: 'UserInfo', userInfoId: number, firstName: string, lastName: string, avatarUrl: string, user: { __typename?: 'User', userId: number } }> };

export type GetUserInfoByUserIdQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetUserInfoByUserIdQuery = { __typename?: 'Query', getUserInfoByUserId: { __typename?: 'UserInfo', userInfoId: number, firstName: string, lastName: string, avatarUrl: string } };

export type UpdateUserInfoMutationVariables = Exact<{
  data: UserInfoInput;
  userInfoId: Scalars['Float']['input'];
}>;


export type UpdateUserInfoMutation = { __typename?: 'Mutation', updateUserInfo: string };

export type GetAllCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCitiesQuery = { __typename?: 'Query', getAllCities: Array<{ __typename?: 'City', cityId: number, cityName: string, imageUrl: string, description: string, cityLatitude: number, cityLongitude: number }> };

export type GetOneCityQueryVariables = Exact<{
  getCityByIdId: Scalars['Float']['input'];
}>;


export type GetOneCityQuery = { __typename?: 'Query', getCityById: { __typename?: 'City', cityId: number, cityName: string, imageUrl: string, description: string } };

export type UpdateOneCityMutationVariables = Exact<{
  data: UpdateCityInput;
  cityId: Scalars['Float']['input'];
}>;


export type UpdateOneCityMutation = { __typename?: 'Mutation', updateCity: { __typename?: 'City', cityId: number } };

export type GetAllPoisQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPoisQuery = { __typename?: 'Query', getAllPois: Array<{ __typename?: 'Poi', poiName: string, poiLongitude: number, poiLatitude: number, imageUrl: string, externalLink: string, poiDescription: string, address: string, poiCategory?: { __typename?: 'Category', categoryId: number, style: string, categoryName: string } | null }> };

export type GetPoiByIdQueryVariables = Exact<{
  getPoiByIdId: Scalars['Float']['input'];
}>;


export type GetPoiByIdQuery = { __typename?: 'Query', getPoiById: { __typename?: 'Poi', address: string, externalLink: string, imageUrl: string, poiDescription: string, poiId: number, poiLatitude: number, poiLongitude: number, poiName: string, poiCity: { __typename?: 'City', cityId: number }, poiCategory?: { __typename?: 'Category', categoryId: number, categoryName: string, style: string } | null } };

export type GetPoisByCityQueryVariables = Exact<{
  cityId: Scalars['Float']['input'];
}>;


export type GetPoisByCityQuery = { __typename?: 'Query', getPoisByCity: Array<{ __typename?: 'Poi', address: string, externalLink: string, imageUrl: string, poiDescription: string, poiId: number, poiLatitude: number, poiLongitude: number, poiName: string, poiCategory?: { __typename?: 'Category', categoryId: number, categoryName: string, style: string } | null, poiCity: { __typename?: 'City', cityName: string } }> };

export type CreatePoiMutationVariables = Exact<{
  data: PoiInput;
}>;


export type CreatePoiMutation = { __typename?: 'Mutation', createPoi: string };

export type DeletePoiMutationVariables = Exact<{
  poiId: Scalars['Float']['input'];
}>;


export type DeletePoiMutation = { __typename?: 'Mutation', deletePoi: string };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', categoryName: string, categoryId: number, style: string }> };

export type CreateCategoryMutationVariables = Exact<{
  data: CategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: string };

export type UpdateCategoryMutationVariables = Exact<{
  data: CategoryInput;
  categoryId: Scalars['Float']['input'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: string };

export type DeleteCategoryMutationVariables = Exact<{
  categoryId: Scalars['Float']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: string };

export type GetPoisByCityAndCategoryQueryVariables = Exact<{
  categoryId: Scalars['Float']['input'];
  cityId: Scalars['Float']['input'];
}>;


export type GetPoisByCityAndCategoryQuery = { __typename?: 'Query', getPoisByCityAndCategory: Array<{ __typename?: 'Poi', address: string, externalLink: string, imageUrl: string, poiDescription: string, poiLatitude: number, poiLongitude: number, poiName: string, poiId: number, poiCategory?: { __typename?: 'Category', categoryId: number, style: string, categoryName: string } | null, poiCity: { __typename?: 'City', cityName: string, cityId: number, cityLatitude: number, cityLongitude: number, description: string, imageUrl: string } }> };

export type CreateCityMutationVariables = Exact<{
  data: CreateCityInput;
}>;


export type CreateCityMutation = { __typename?: 'Mutation', createCity: string };


export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    userId
    email
    roles
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
// @ts-ignore
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllUsersQuery | undefined, GetAllUsersQueryVariables>;
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
      roles
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
export const GetUserByIdDocument = gql`
    query GetUserById($userId: ID!) {
  getUserById(userId: $userId) {
    userId
    email
    roles
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables> & ({ variables: GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
// @ts-ignore
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetUserByIdQuery | undefined, GetUserByIdQueryVariables>;
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const UpdateUserRoleDocument = gql`
    mutation UpdateUserRole($data: UpdateUserRoleInput!, $userId: Float!) {
  updateUserRole(data: $data, userId: $userId)
}
    `;
export type UpdateUserRoleMutationFn = Apollo.MutationFunction<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;

/**
 * __useUpdateUserRoleMutation__
 *
 * To run a mutation, you first call `useUpdateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRoleMutation, { data, loading, error }] = useUpdateUserRoleMutation({
 *   variables: {
 *      data: // value for 'data'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateUserRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(UpdateUserRoleDocument, options);
      }
export type UpdateUserRoleMutationHookResult = ReturnType<typeof useUpdateUserRoleMutation>;
export type UpdateUserRoleMutationResult = Apollo.MutationResult<UpdateUserRoleMutation>;
export type UpdateUserRoleMutationOptions = Apollo.BaseMutationOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;
export const UpdateUserDataDocument = gql`
    mutation UpdateUserData($data: UpdateUserDataInput!, $userId: Float!) {
  updateUserData(data: $data, userId: $userId)
}
    `;
export type UpdateUserDataMutationFn = Apollo.MutationFunction<UpdateUserDataMutation, UpdateUserDataMutationVariables>;

/**
 * __useUpdateUserDataMutation__
 *
 * To run a mutation, you first call `useUpdateUserDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserDataMutation, { data, loading, error }] = useUpdateUserDataMutation({
 *   variables: {
 *      data: // value for 'data'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateUserDataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserDataMutation, UpdateUserDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserDataMutation, UpdateUserDataMutationVariables>(UpdateUserDataDocument, options);
      }
export type UpdateUserDataMutationHookResult = ReturnType<typeof useUpdateUserDataMutation>;
export type UpdateUserDataMutationResult = Apollo.MutationResult<UpdateUserDataMutation>;
export type UpdateUserDataMutationOptions = Apollo.BaseMutationOptions<UpdateUserDataMutation, UpdateUserDataMutationVariables>;
export const DeleteUserByIdDocument = gql`
    mutation DeleteUserByID($userId: Float!) {
  deleteUser(userId: $userId)
}
    `;
export type DeleteUserByIdMutationFn = Apollo.MutationFunction<DeleteUserByIdMutation, DeleteUserByIdMutationVariables>;

/**
 * __useDeleteUserByIdMutation__
 *
 * To run a mutation, you first call `useDeleteUserByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserByIdMutation, { data, loading, error }] = useDeleteUserByIdMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserByIdMutation, DeleteUserByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserByIdMutation, DeleteUserByIdMutationVariables>(DeleteUserByIdDocument, options);
      }
export type DeleteUserByIdMutationHookResult = ReturnType<typeof useDeleteUserByIdMutation>;
export type DeleteUserByIdMutationResult = Apollo.MutationResult<DeleteUserByIdMutation>;
export type DeleteUserByIdMutationOptions = Apollo.BaseMutationOptions<DeleteUserByIdMutation, DeleteUserByIdMutationVariables>;
export const GetAllUserInfosDocument = gql`
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

/**
 * __useGetAllUserInfosQuery__
 *
 * To run a query within a React component, call `useGetAllUserInfosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserInfosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserInfosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserInfosQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUserInfosQuery, GetAllUserInfosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUserInfosQuery, GetAllUserInfosQueryVariables>(GetAllUserInfosDocument, options);
      }
export function useGetAllUserInfosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserInfosQuery, GetAllUserInfosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUserInfosQuery, GetAllUserInfosQueryVariables>(GetAllUserInfosDocument, options);
        }
// @ts-ignore
export function useGetAllUserInfosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUserInfosQuery, GetAllUserInfosQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllUserInfosQuery, GetAllUserInfosQueryVariables>;
export function useGetAllUserInfosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllUserInfosQuery, GetAllUserInfosQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllUserInfosQuery | undefined, GetAllUserInfosQueryVariables>;
export function useGetAllUserInfosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllUserInfosQuery, GetAllUserInfosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUserInfosQuery, GetAllUserInfosQueryVariables>(GetAllUserInfosDocument, options);
        }
export type GetAllUserInfosQueryHookResult = ReturnType<typeof useGetAllUserInfosQuery>;
export type GetAllUserInfosLazyQueryHookResult = ReturnType<typeof useGetAllUserInfosLazyQuery>;
export type GetAllUserInfosSuspenseQueryHookResult = ReturnType<typeof useGetAllUserInfosSuspenseQuery>;
export type GetAllUserInfosQueryResult = Apollo.QueryResult<GetAllUserInfosQuery, GetAllUserInfosQueryVariables>;
export const GetUserInfoByUserIdDocument = gql`
    query getUserInfoByUserId($userId: Float!) {
  getUserInfoByUserId(userId: $userId) {
    userInfoId
    firstName
    lastName
    avatarUrl
  }
}
    `;

/**
 * __useGetUserInfoByUserIdQuery__
 *
 * To run a query within a React component, call `useGetUserInfoByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserInfoByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserInfoByUserIdQuery, GetUserInfoByUserIdQueryVariables> & ({ variables: GetUserInfoByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoByUserIdQuery, GetUserInfoByUserIdQueryVariables>(GetUserInfoByUserIdDocument, options);
      }
export function useGetUserInfoByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoByUserIdQuery, GetUserInfoByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoByUserIdQuery, GetUserInfoByUserIdQueryVariables>(GetUserInfoByUserIdDocument, options);
        }
// @ts-ignore
export function useGetUserInfoByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserInfoByUserIdQuery, GetUserInfoByUserIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetUserInfoByUserIdQuery, GetUserInfoByUserIdQueryVariables>;
export function useGetUserInfoByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserInfoByUserIdQuery, GetUserInfoByUserIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetUserInfoByUserIdQuery | undefined, GetUserInfoByUserIdQueryVariables>;
export function useGetUserInfoByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserInfoByUserIdQuery, GetUserInfoByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserInfoByUserIdQuery, GetUserInfoByUserIdQueryVariables>(GetUserInfoByUserIdDocument, options);
        }
export type GetUserInfoByUserIdQueryHookResult = ReturnType<typeof useGetUserInfoByUserIdQuery>;
export type GetUserInfoByUserIdLazyQueryHookResult = ReturnType<typeof useGetUserInfoByUserIdLazyQuery>;
export type GetUserInfoByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetUserInfoByUserIdSuspenseQuery>;
export type GetUserInfoByUserIdQueryResult = Apollo.QueryResult<GetUserInfoByUserIdQuery, GetUserInfoByUserIdQueryVariables>;
export const UpdateUserInfoDocument = gql`
    mutation UpdateUserInfo($data: UserInfoInput!, $userInfoId: Float!) {
  updateUserInfo(data: $data, userInfoId: $userInfoId)
}
    `;
export type UpdateUserInfoMutationFn = Apollo.MutationFunction<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;

/**
 * __useUpdateUserInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInfoMutation, { data, loading, error }] = useUpdateUserInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *      userInfoId: // value for 'userInfoId'
 *   },
 * });
 */
export function useUpdateUserInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>(UpdateUserInfoDocument, options);
      }
export type UpdateUserInfoMutationHookResult = ReturnType<typeof useUpdateUserInfoMutation>;
export type UpdateUserInfoMutationResult = Apollo.MutationResult<UpdateUserInfoMutation>;
export type UpdateUserInfoMutationOptions = Apollo.BaseMutationOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
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
// @ts-ignore
export function useGetAllCitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllCitiesQuery, GetAllCitiesQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllCitiesQuery, GetAllCitiesQueryVariables>;
export function useGetAllCitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCitiesQuery, GetAllCitiesQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllCitiesQuery | undefined, GetAllCitiesQueryVariables>;
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
// @ts-ignore
export function useGetOneCitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOneCityQuery, GetOneCityQueryVariables>): Apollo.UseSuspenseQueryResult<GetOneCityQuery, GetOneCityQueryVariables>;
export function useGetOneCitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneCityQuery, GetOneCityQueryVariables>): Apollo.UseSuspenseQueryResult<GetOneCityQuery | undefined, GetOneCityQueryVariables>;
export function useGetOneCitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneCityQuery, GetOneCityQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOneCityQuery, GetOneCityQueryVariables>(GetOneCityDocument, options);
        }
export type GetOneCityQueryHookResult = ReturnType<typeof useGetOneCityQuery>;
export type GetOneCityLazyQueryHookResult = ReturnType<typeof useGetOneCityLazyQuery>;
export type GetOneCitySuspenseQueryHookResult = ReturnType<typeof useGetOneCitySuspenseQuery>;
export type GetOneCityQueryResult = Apollo.QueryResult<GetOneCityQuery, GetOneCityQueryVariables>;
export const UpdateOneCityDocument = gql`
    mutation UpdateOneCity($data: UpdateCityInput!, $cityId: Float!) {
  updateCity(data: $data, cityId: $cityId) {
    cityId
  }
}
    `;
export type UpdateOneCityMutationFn = Apollo.MutationFunction<UpdateOneCityMutation, UpdateOneCityMutationVariables>;

/**
 * __useUpdateOneCityMutation__
 *
 * To run a mutation, you first call `useUpdateOneCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneCityMutation, { data, loading, error }] = useUpdateOneCityMutation({
 *   variables: {
 *      data: // value for 'data'
 *      cityId: // value for 'cityId'
 *   },
 * });
 */
export function useUpdateOneCityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneCityMutation, UpdateOneCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneCityMutation, UpdateOneCityMutationVariables>(UpdateOneCityDocument, options);
      }
export type UpdateOneCityMutationHookResult = ReturnType<typeof useUpdateOneCityMutation>;
export type UpdateOneCityMutationResult = Apollo.MutationResult<UpdateOneCityMutation>;
export type UpdateOneCityMutationOptions = Apollo.BaseMutationOptions<UpdateOneCityMutation, UpdateOneCityMutationVariables>;
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
      categoryId
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
// @ts-ignore
export function useGetAllPoisSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllPoisQuery, GetAllPoisQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllPoisQuery, GetAllPoisQueryVariables>;
export function useGetAllPoisSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllPoisQuery, GetAllPoisQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllPoisQuery | undefined, GetAllPoisQueryVariables>;
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
// @ts-ignore
export function useGetPoiByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPoiByIdQuery, GetPoiByIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetPoiByIdQuery, GetPoiByIdQueryVariables>;
export function useGetPoiByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPoiByIdQuery, GetPoiByIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetPoiByIdQuery | undefined, GetPoiByIdQueryVariables>;
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
// @ts-ignore
export function useGetPoisByCitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPoisByCityQuery, GetPoisByCityQueryVariables>): Apollo.UseSuspenseQueryResult<GetPoisByCityQuery, GetPoisByCityQueryVariables>;
export function useGetPoisByCitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPoisByCityQuery, GetPoisByCityQueryVariables>): Apollo.UseSuspenseQueryResult<GetPoisByCityQuery | undefined, GetPoisByCityQueryVariables>;
export function useGetPoisByCitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPoisByCityQuery, GetPoisByCityQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPoisByCityQuery, GetPoisByCityQueryVariables>(GetPoisByCityDocument, options);
        }
export type GetPoisByCityQueryHookResult = ReturnType<typeof useGetPoisByCityQuery>;
export type GetPoisByCityLazyQueryHookResult = ReturnType<typeof useGetPoisByCityLazyQuery>;
export type GetPoisByCitySuspenseQueryHookResult = ReturnType<typeof useGetPoisByCitySuspenseQuery>;
export type GetPoisByCityQueryResult = Apollo.QueryResult<GetPoisByCityQuery, GetPoisByCityQueryVariables>;
export const CreatePoiDocument = gql`
    mutation CreatePoi($data: PoiInput!) {
  createPoi(data: $data)
}
    `;
export type CreatePoiMutationFn = Apollo.MutationFunction<CreatePoiMutation, CreatePoiMutationVariables>;

/**
 * __useCreatePoiMutation__
 *
 * To run a mutation, you first call `useCreatePoiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePoiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPoiMutation, { data, loading, error }] = useCreatePoiMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePoiMutation(baseOptions?: Apollo.MutationHookOptions<CreatePoiMutation, CreatePoiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePoiMutation, CreatePoiMutationVariables>(CreatePoiDocument, options);
      }
export type CreatePoiMutationHookResult = ReturnType<typeof useCreatePoiMutation>;
export type CreatePoiMutationResult = Apollo.MutationResult<CreatePoiMutation>;
export type CreatePoiMutationOptions = Apollo.BaseMutationOptions<CreatePoiMutation, CreatePoiMutationVariables>;
export const DeletePoiDocument = gql`
    mutation DeletePoi($poiId: Float!) {
  deletePoi(poiId: $poiId)
}
    `;
export type DeletePoiMutationFn = Apollo.MutationFunction<DeletePoiMutation, DeletePoiMutationVariables>;

/**
 * __useDeletePoiMutation__
 *
 * To run a mutation, you first call `useDeletePoiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePoiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePoiMutation, { data, loading, error }] = useDeletePoiMutation({
 *   variables: {
 *      poiId: // value for 'poiId'
 *   },
 * });
 */
export function useDeletePoiMutation(baseOptions?: Apollo.MutationHookOptions<DeletePoiMutation, DeletePoiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePoiMutation, DeletePoiMutationVariables>(DeletePoiDocument, options);
      }
export type DeletePoiMutationHookResult = ReturnType<typeof useDeletePoiMutation>;
export type DeletePoiMutationResult = Apollo.MutationResult<DeletePoiMutation>;
export type DeletePoiMutationOptions = Apollo.BaseMutationOptions<DeletePoiMutation, DeletePoiMutationVariables>;
export const GetAllCategoriesDocument = gql`
    query GetAllCategories {
  getAllCategories {
    categoryName
    categoryId
    style
  }
}
    `;

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
      }
export function useGetAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
// @ts-ignore
export function useGetAllCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export function useGetAllCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllCategoriesQuery | undefined, GetAllCategoriesQueryVariables>;
export function useGetAllCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export type GetAllCategoriesQueryHookResult = ReturnType<typeof useGetAllCategoriesQuery>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesLazyQuery>;
export type GetAllCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAllCategoriesSuspenseQuery>;
export type GetAllCategoriesQueryResult = Apollo.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($data: CategoryInput!) {
  createCategory(data: $data)
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($data: CategoryInput!, $categoryId: Float!) {
  updateCategory(data: $data, categoryId: $categoryId)
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($categoryId: Float!) {
  deleteCategory(categoryId: $categoryId)
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const GetPoisByCityAndCategoryDocument = gql`
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

/**
 * __useGetPoisByCityAndCategoryQuery__
 *
 * To run a query within a React component, call `useGetPoisByCityAndCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoisByCityAndCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoisByCityAndCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      cityId: // value for 'cityId'
 *   },
 * });
 */
export function useGetPoisByCityAndCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetPoisByCityAndCategoryQuery, GetPoisByCityAndCategoryQueryVariables> & ({ variables: GetPoisByCityAndCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPoisByCityAndCategoryQuery, GetPoisByCityAndCategoryQueryVariables>(GetPoisByCityAndCategoryDocument, options);
      }
export function useGetPoisByCityAndCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPoisByCityAndCategoryQuery, GetPoisByCityAndCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPoisByCityAndCategoryQuery, GetPoisByCityAndCategoryQueryVariables>(GetPoisByCityAndCategoryDocument, options);
        }
// @ts-ignore
export function useGetPoisByCityAndCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPoisByCityAndCategoryQuery, GetPoisByCityAndCategoryQueryVariables>): Apollo.UseSuspenseQueryResult<GetPoisByCityAndCategoryQuery, GetPoisByCityAndCategoryQueryVariables>;
export function useGetPoisByCityAndCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPoisByCityAndCategoryQuery, GetPoisByCityAndCategoryQueryVariables>): Apollo.UseSuspenseQueryResult<GetPoisByCityAndCategoryQuery | undefined, GetPoisByCityAndCategoryQueryVariables>;
export function useGetPoisByCityAndCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPoisByCityAndCategoryQuery, GetPoisByCityAndCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPoisByCityAndCategoryQuery, GetPoisByCityAndCategoryQueryVariables>(GetPoisByCityAndCategoryDocument, options);
        }
export type GetPoisByCityAndCategoryQueryHookResult = ReturnType<typeof useGetPoisByCityAndCategoryQuery>;
export type GetPoisByCityAndCategoryLazyQueryHookResult = ReturnType<typeof useGetPoisByCityAndCategoryLazyQuery>;
export type GetPoisByCityAndCategorySuspenseQueryHookResult = ReturnType<typeof useGetPoisByCityAndCategorySuspenseQuery>;
export type GetPoisByCityAndCategoryQueryResult = Apollo.QueryResult<GetPoisByCityAndCategoryQuery, GetPoisByCityAndCategoryQueryVariables>;
export const CreateCityDocument = gql`
    mutation createCity($data: CreateCityInput!) {
  createCity(data: $data)
}
    `;
export type CreateCityMutationFn = Apollo.MutationFunction<CreateCityMutation, CreateCityMutationVariables>;

/**
 * __useCreateCityMutation__
 *
 * To run a mutation, you first call `useCreateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCityMutation, { data, loading, error }] = useCreateCityMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCityMutation, CreateCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCityMutation, CreateCityMutationVariables>(CreateCityDocument, options);
      }
export type CreateCityMutationHookResult = ReturnType<typeof useCreateCityMutation>;
export type CreateCityMutationResult = Apollo.MutationResult<CreateCityMutation>;
export type CreateCityMutationOptions = Apollo.BaseMutationOptions<CreateCityMutation, CreateCityMutationVariables>;