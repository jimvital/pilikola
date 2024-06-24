import { NextApiRequest, NextApiResponse } from "next";
import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";

import { listMovies } from "@/graphql/queries";
import {
  createMovie,
  createWatchlist,
  createWatchlistMovies,
} from "@/graphql/mutations";

import awsExports from "@/aws-exports";

Amplify.configure(awsExports);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = generateClient();

    const { watchlistName, watchlistDescription, userId, appliedMovies } =
      JSON.parse(req.body);

    const {
      data: { createWatchlist: createdWatchlist },
    }: any = await client.graphql({
      query: createWatchlist,
      variables: {
        input: {
          name: watchlistName,
          description: watchlistDescription,
          userId,
        },
      },
    });

    const {
      data: {
        listMovies: { items: allMovies },
      },
    }: any = await client.graphql({
      query: listMovies,
    });

    await Promise.all(
      appliedMovies.map(async (movie: Movie) => {
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
              watchlistId: createdWatchlist.id,
              movieId,
            },
          },
        });
      })
    );

    return res.status(200).json({ message: "Successfully created watchlist!" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong!", details: error });
  }
};

export default handler;
