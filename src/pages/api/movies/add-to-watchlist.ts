import { NextApiRequest, NextApiResponse } from "next";
import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";

import { listMovies } from "@/graphql/queries";
import { createMovie, createWatchlistMovies } from "@/graphql/mutations";

import awsExports from "@/aws-exports";

Amplify.configure(awsExports);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = generateClient();

    const { movie, selectedItems } = JSON.parse(req.body);

    const {
      data: {
        listMovies: { items: allMovies },
      },
    }: any = await client.graphql({
      query: listMovies,
    });

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

    await Promise.all(
      selectedItems.map(async (selected: any) => {
        await client.graphql({
          query: createWatchlistMovies,
          variables: {
            input: {
              watchlistId: selected.value,
              movieId,
            },
          },
        });
      })
    );

    return res
      .status(200)
      .json({ message: "Successfully added movie to watchlist!" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong!", details: error });
  }
};

export default handler;
