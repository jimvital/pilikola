/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateWatchlist = /* GraphQL */ `
  subscription OnCreateWatchlist(
    $filter: ModelSubscriptionWatchlistFilterInput
  ) {
    onCreateWatchlist(filter: $filter) {
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
export const onUpdateWatchlist = /* GraphQL */ `
  subscription OnUpdateWatchlist(
    $filter: ModelSubscriptionWatchlistFilterInput
  ) {
    onUpdateWatchlist(filter: $filter) {
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
export const onDeleteWatchlist = /* GraphQL */ `
  subscription OnDeleteWatchlist(
    $filter: ModelSubscriptionWatchlistFilterInput
  ) {
    onDeleteWatchlist(filter: $filter) {
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
export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie($filter: ModelSubscriptionMovieFilterInput) {
    onCreateMovie(filter: $filter) {
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
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie($filter: ModelSubscriptionMovieFilterInput) {
    onUpdateMovie(filter: $filter) {
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
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie($filter: ModelSubscriptionMovieFilterInput) {
    onDeleteMovie(filter: $filter) {
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
