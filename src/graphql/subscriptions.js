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
export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie($filter: ModelSubscriptionMovieFilterInput) {
    onCreateMovie(filter: $filter) {
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
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie($filter: ModelSubscriptionMovieFilterInput) {
    onUpdateMovie(filter: $filter) {
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
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie($filter: ModelSubscriptionMovieFilterInput) {
    onDeleteMovie(filter: $filter) {
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
export const onCreateUserMovies = /* GraphQL */ `
  subscription OnCreateUserMovies(
    $filter: ModelSubscriptionUserMoviesFilterInput
  ) {
    onCreateUserMovies(filter: $filter) {
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
export const onUpdateUserMovies = /* GraphQL */ `
  subscription OnUpdateUserMovies(
    $filter: ModelSubscriptionUserMoviesFilterInput
  ) {
    onUpdateUserMovies(filter: $filter) {
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
export const onDeleteUserMovies = /* GraphQL */ `
  subscription OnDeleteUserMovies(
    $filter: ModelSubscriptionUserMoviesFilterInput
  ) {
    onDeleteUserMovies(filter: $filter) {
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
export const onCreateWatchlistMovies = /* GraphQL */ `
  subscription OnCreateWatchlistMovies(
    $filter: ModelSubscriptionWatchlistMoviesFilterInput
  ) {
    onCreateWatchlistMovies(filter: $filter) {
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
export const onUpdateWatchlistMovies = /* GraphQL */ `
  subscription OnUpdateWatchlistMovies(
    $filter: ModelSubscriptionWatchlistMoviesFilterInput
  ) {
    onUpdateWatchlistMovies(filter: $filter) {
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
export const onDeleteWatchlistMovies = /* GraphQL */ `
  subscription OnDeleteWatchlistMovies(
    $filter: ModelSubscriptionWatchlistMoviesFilterInput
  ) {
    onDeleteWatchlistMovies(filter: $filter) {
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
