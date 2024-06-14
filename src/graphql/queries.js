/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($cognitoId: ID!) {
    getUser(cognitoId: $cognitoId) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $cognitoId: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      cognitoId: $cognitoId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        cognitoId
        name
        username
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWatchlist = /* GraphQL */ `
  query GetWatchlist($id: ID!) {
    getWatchlist(id: $id) {
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
export const listWatchlists = /* GraphQL */ `
  query ListWatchlists(
    $filter: ModelWatchlistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWatchlists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        userWatchlistsCognitoId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMovie = /* GraphQL */ `
  query GetMovie($id: ID!) {
    getMovie(id: $id) {
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
export const listMovies = /* GraphQL */ `
  query ListMovies(
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
