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
};

export type City = {
  __typename?: 'City';
  cityId: Scalars['Float']['output'];
  cityName: Scalars['String']['output'];
  cityPois?: Maybe<Array<Poi>>;
  cityRate?: Maybe<Array<Rate>>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  createdBy: User;
  description: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type Comment = {
  __typename?: 'Comment';
  commentId: Scalars['Float']['output'];
  commentPoi: Poi;
  commentUser: User;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type CreateCityInput = {
  cityName: Scalars['String']['input'];
  createdBy: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
};

export type CreateCityRateInput = {
  rate: Scalars['Float']['input'];
  rateCity: Scalars['ID']['input'];
  rateUser: Scalars['ID']['input'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  createdBy: Scalars['ID']['input'];
  poi: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type CreatePoiRateInput = {
  rate: Scalars['Float']['input'];
  ratePoi: Scalars['ID']['input'];
  rateUser: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCity: Scalars['ID']['output'];
  createCityRate: Scalars['ID']['output'];
  createPoiComment: Scalars['ID']['output'];
  createPoiRate: Scalars['ID']['output'];
  deleteCity: Scalars['ID']['output'];
  login: UserResponse;
  logout: UserResponse;
  signup: UserResponse;
  updateCity: Scalars['ID']['output'];
};


export type MutationCreateCityArgs = {
  data: CreateCityInput;
};


export type MutationCreateCityRateArgs = {
  data: CreateCityRateInput;
};


export type MutationCreatePoiCommentArgs = {
  data: CreateCommentInput;
};


export type MutationCreatePoiRateArgs = {
  data: CreatePoiRateInput;
};


export type MutationDeleteCityArgs = {
  cityId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  data: UserInput;
};


export type MutationSignupArgs = {
  data: NewUserInput;
};


export type MutationUpdateCityArgs = {
  cityId: Scalars['Float']['input'];
  data: UpdateCityInput;
};

export type NewUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Poi = {
  __typename?: 'Poi';
  address: Scalars['String']['output'];
  comment?: Maybe<Array<Comment>>;
  coordinates: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: User;
  imageUrl: Scalars['String']['output'];
  pin: Scalars['String']['output'];
  poiCategories?: Maybe<Array<Category>>;
  poiDescription: Scalars['String']['output'];
  poiId: Scalars['Float']['output'];
  poiName: Scalars['String']['output'];
  rates?: Maybe<Array<Rate>>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAllCities: Array<City>;
  getAllUsers: Array<User>;
  getUserById?: Maybe<User>;
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['ID']['input'];
};

export type Rate = {
  __typename?: 'Rate';
  rate: Scalars['Float']['output'];
  rateCity?: Maybe<City>;
  rateId: Scalars['Float']['output'];
  ratePoi?: Maybe<Poi>;
  rateUser: User;
};

/** Roles for users in this app */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UpdateCityInput = {
  cityName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdCities?: Maybe<Array<City>>;
  createdComments?: Maybe<Array<Comment>>;
  createdPois?: Maybe<Array<Poi>>;
  createdRates?: Maybe<Array<Rate>>;
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