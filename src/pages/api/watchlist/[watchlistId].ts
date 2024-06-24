import { NextApiRequest, NextApiResponse } from "next";
import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";

import {
  getUser,
  getWatchlist,
  listMovies,
  listWatchlistMovies,
  watchlistMoviesByWatchlistId,
} from "@/graphql/queries";
import {
  createMovie,
  createWatchlistMovies,
  deleteWatchlistMovies,
  updateWatchlist,
} from "@/graphql/mutations";

import awsExports from "@/aws-exports";

Amplify.configure(awsExports);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = generateClient();

    const { watchlistId, userId } = req.query;

    if (req.method === "PATCH") {
      const {
        watchlistName,
        watchlistDescription,
        watchlistMovies,
        appliedMovies,
      } = JSON.parse(req.body);

      // Update initial watchlist info
      await client.graphql({
        query: updateWatchlist,
        variables: {
          input: {
            id: watchlistId,
            name: watchlistName,
            description: watchlistDescription,
            userId,
          },
        },
      });

      // Create watchlist - movie connections, if applicable
      const {
        data: {
          listMovies: { items: allMovies },
        },
      }: any = await client.graphql({
        query: listMovies,
      });

      const prevWatchlistMovies = watchlistMovies || [];

      await Promise.all(
        appliedMovies.map(async (movie: Movie) => {
          // Do not create new watchlist - movie connection if already existing
          const isExisting =
            prevWatchlistMovies.find((prev: Movie) => prev.id === movie.id) !==
            undefined;

          if (isExisting) return;

          const currentMovie = allMovies.find(
            (temp: any) => temp.tmdbId === movie.id
          );

          let movieId = "";

          if (!currentMovie) {
            const {
              data: { createMovie: createdMovie },
            }: any = await client.graphql({
              query: createMovie,
              variables: {
                input: {
                  tmdbId: movie.id,
                  title: movie.title,
                  releaseDate: movie.releaseDate,
                  rating: movie.rating,
                  posterUrl: movie.posterUrl,
                },
              },
            });

            movieId = createdMovie.id;
          } else {
            movieId = currentMovie.id;
          }

          await client.graphql({
            query: createWatchlistMovies,
            variables: {
              input: {
                watchlistId,
                movieId,
              },
            },
          });
        })
      );

      // Delete watchlist - movie connection based on edited selections
      const {
        data: {
          listWatchlistMovies: { items: allWatchlistMovies },
        },
      }: any = await client.graphql({
        query: listWatchlistMovies,
      });

      const watchlistMoviesToDelete = prevWatchlistMovies.filter(
        (movie: Movie) => {
          const isExisting = appliedMovies.find(
            (applied: Movie) => applied.id === movie.id
          );

          return !isExisting;
        }
      );

      await Promise.all(
        watchlistMoviesToDelete.map(async (movie: Movie) => {
          const movieToDelete = allWatchlistMovies.find(
            (temp: any) =>
              temp.movie.tmdbId === movie.id && temp.watchlistId === watchlistId
          );

          await client.graphql({
            query: deleteWatchlistMovies,
            variables: {
              input: {
                id: movieToDelete.id,
              },
            },
          });
        })
      );

      return res
        .status(200)
        .json({ message: "Successfully edited watchlist!" });
    }

    const {
      data: { getWatchlist: watchlistDetails },
    }: any = await client.graphql({
      query: getWatchlist,
      variables: {
        id: watchlistId,
      },
    });
    const {
      data: {
        watchlistMoviesByWatchlistId: { items: watchlistMovies },
      },
    }: any = await client.graphql({
      query: watchlistMoviesByWatchlistId,
      variables: {
        watchlistId,
      },
    });

    const normalizedMovies = watchlistMovies.map(({ movie }: any) => ({
      id: movie.tmdbId,
      dbId: movie.id,
      title: movie.title,
      posterUrl: movie.posterUrl,
      releaseDate: movie.releaseDate,
      rating: movie.rating,
    }));

    if (!userId) {
      return res
        .status(200)
        .json({ ...watchlistDetails, movies: normalizedMovies });
    }

    const {
      data: { getUser: currentUser },
    }: any = await client.graphql({
      query: getUser,
      variables: {
        cognitoId: userId,
      },
    });

    const watchedMovies = currentUser.allWatched.items
      .map((watched: any) => ({
        relationId: watched.id,
        tmdbId: watched.movie.tmdbId,
      }))
      .filter((watched: any) =>
        normalizedMovies.some(
          (watchlistMovie: any) => watchlistMovie.id === watched.tmdbId
        )
      );

    const averageRating =
      normalizedMovies.reduce(
        (acc: number, curr: Movie) => acc + curr.rating,
        0
      ) / normalizedMovies.length;

    return res.status(200).json({
      ...watchlistDetails,
      movies: normalizedMovies,
      watchedMovies,
      averageRating,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong!", details: error });
  }
};

export default handler;
