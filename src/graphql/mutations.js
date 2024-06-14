/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      cognitoId
      name
      username
      watchlists {
        nextToken
        __typename
      }
      globalWatched {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      cognitoId
      name
      username
      watchlists {
        nextToken
        __typename
      }
      globalWatched {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      cognitoId
      name
      username
      watchlists {
        nextToken
        __typename
      }
      globalWatched {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createWatchlist = /* GraphQL */ `
  mutation CreateWatchlist(
    $input: CreateWatchlistInput!
    $condition: ModelWatchlistConditionInput
  ) {
    createWatchlist(input: $input, condition: $condition) {
      id
      name
      description
      movies {
        nextToken
        __typename
      }
      user {
        cognitoId
        name
        username
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      userWatchlistsCognitoId
      __typename
    }
  }
`;
export const updateWatchlist = /* GraphQL */ `
  mutation UpdateWatchlist(
    $input: UpdateWatchlistInput!
    $condition: ModelWatchlistConditionInput
  ) {
    updateWatchlist(input: $input, condition: $condition) {
      id
      name
      description
      movies {
        nextToken
        __typename
      }
      user {
        cognitoId
        name
        username
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      userWatchlistsCognitoId
      __typename
    }
  }
`;
export const deleteWatchlist = /* GraphQL */ `
  mutation DeleteWatchlist(
    $input: DeleteWatchlistInput!
    $condition: ModelWatchlistConditionInput
  ) {
    deleteWatchlist(input: $input, condition: $condition) {
      id
      name
      description
      movies {
        nextToken
        __typename
      }
      user {
        cognitoId
        name
        username
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      userWatchlistsCognitoId
      __typename
    }
  }
`;
export const createMovie = /* GraphQL */ `
  mutation CreateMovie(
    $input: CreateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    createMovie(input: $input, condition: $condition) {
      id
      tmdbId
      title
      releaseDate
      rating
      runtime
      posterUrl
      createdAt
      updatedAt
      userGlobalWatchedCognitoId
      watchlistMoviesId
      __typename
    }
  }
`;
export const updateMovie = /* GraphQL */ `
  mutation UpdateMovie(
    $input: UpdateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    updateMovie(input: $input, condition: $condition) {
      id
      tmdbId
      title
      releaseDate
      rating
      runtime
      posterUrl
      createdAt
      updatedAt
      userGlobalWatchedCognitoId
      watchlistMoviesId
      __typename
    }
  }
`;
export const deleteMovie = /* GraphQL */ `
  mutation DeleteMovie(
    $input: DeleteMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    deleteMovie(input: $input, condition: $condition) {
      id
      tmdbId
      title
      releaseDate
      rating
      runtime
      posterUrl
      createdAt
      updatedAt
      userGlobalWatchedCognitoId
      watchlistMoviesId
      __typename
    }
  }
`;
