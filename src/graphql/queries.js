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
      allWatched {
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
      userId
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
        userId
        createdAt
        updatedAt
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
      posterUrl
      watchedBy {
        nextToken
        __typename
      }
      listedIn {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
        posterUrl
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserMovies = /* GraphQL */ `
  query GetUserMovies($id: ID!) {
    getUserMovies(id: $id) {
      id
      userCognitoId
      movieId
      user {
        cognitoId
        name
        username
        createdAt
        updatedAt
        __typename
      }
      movie {
        id
        tmdbId
        title
        releaseDate
        rating
        posterUrl
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserMovies = /* GraphQL */ `
  query ListUserMovies(
    $filter: ModelUserMoviesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserMovies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userCognitoId
        movieId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWatchlistMovies = /* GraphQL */ `
  query GetWatchlistMovies($id: ID!) {
    getWatchlistMovies(id: $id) {
      id
      watchlistId
      movieId
      watchlist {
        id
        name
        description
        userId
        createdAt
        updatedAt
        __typename
      }
      movie {
        id
        tmdbId
        title
        releaseDate
        rating
        posterUrl
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listWatchlistMovies = /* GraphQL */ `
  query ListWatchlistMovies(
    $filter: ModelWatchlistMoviesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWatchlistMovies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        watchlistId
        movieId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const watchlistsByUserId = /* GraphQL */ `
  query WatchlistsByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWatchlistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    watchlistsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const userMoviesByUserCognitoId = /* GraphQL */ `
  query UserMoviesByUserCognitoId(
    $userCognitoId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserMoviesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userMoviesByUserCognitoId(
      userCognitoId: $userCognitoId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userCognitoId
        movieId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const userMoviesByMovieId = /* GraphQL */ `
  query UserMoviesByMovieId(
    $movieId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserMoviesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userMoviesByMovieId(
      movieId: $movieId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userCognitoId
        movieId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const watchlistMoviesByWatchlistId = /* GraphQL */ `
  query WatchlistMoviesByWatchlistId(
    $watchlistId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWatchlistMoviesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    watchlistMoviesByWatchlistId(
      watchlistId: $watchlistId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        watchlistId
        movieId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const watchlistMoviesByMovieId = /* GraphQL */ `
  query WatchlistMoviesByMovieId(
    $movieId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWatchlistMoviesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    watchlistMoviesByMovieId(
      movieId: $movieId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        watchlistId
        movieId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
