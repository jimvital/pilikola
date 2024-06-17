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
      allWatched {
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
      allWatched {
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
      allWatched {
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
      userId
      user {
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
      createdAt
      updatedAt
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
      userId
      user {
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
      createdAt
      updatedAt
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
      userId
      user {
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
      createdAt
      updatedAt
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
      posterUrl
      watchedBy {
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
      listedIn {
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
      createdAt
      updatedAt
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
      posterUrl
      watchedBy {
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
      listedIn {
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
      createdAt
      updatedAt
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
      posterUrl
      watchedBy {
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
      listedIn {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUserMovies = /* GraphQL */ `
  mutation CreateUserMovies(
    $input: CreateUserMoviesInput!
    $condition: ModelUserMoviesConditionInput
  ) {
    createUserMovies(input: $input, condition: $condition) {
      id
      userCognitoId
      movieId
      user {
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
      movie {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserMovies = /* GraphQL */ `
  mutation UpdateUserMovies(
    $input: UpdateUserMoviesInput!
    $condition: ModelUserMoviesConditionInput
  ) {
    updateUserMovies(input: $input, condition: $condition) {
      id
      userCognitoId
      movieId
      user {
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
      movie {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserMovies = /* GraphQL */ `
  mutation DeleteUserMovies(
    $input: DeleteUserMoviesInput!
    $condition: ModelUserMoviesConditionInput
  ) {
    deleteUserMovies(input: $input, condition: $condition) {
      id
      userCognitoId
      movieId
      user {
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
      movie {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createWatchlistMovies = /* GraphQL */ `
  mutation CreateWatchlistMovies(
    $input: CreateWatchlistMoviesInput!
    $condition: ModelWatchlistMoviesConditionInput
  ) {
    createWatchlistMovies(input: $input, condition: $condition) {
      id
      watchlistId
      movieId
      watchlist {
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
      movie {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateWatchlistMovies = /* GraphQL */ `
  mutation UpdateWatchlistMovies(
    $input: UpdateWatchlistMoviesInput!
    $condition: ModelWatchlistMoviesConditionInput
  ) {
    updateWatchlistMovies(input: $input, condition: $condition) {
      id
      watchlistId
      movieId
      watchlist {
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
      movie {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteWatchlistMovies = /* GraphQL */ `
  mutation DeleteWatchlistMovies(
    $input: DeleteWatchlistMoviesInput!
    $condition: ModelWatchlistMoviesConditionInput
  ) {
    deleteWatchlistMovies(input: $input, condition: $condition) {
      id
      watchlistId
      movieId
      watchlist {
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
      movie {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
