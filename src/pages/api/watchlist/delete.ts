import { NextApiRequest, NextApiResponse } from "next";
import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";

import { listWatchlistMovies } from "@/graphql/queries";
import { deleteWatchlist, deleteWatchlistMovies } from "@/graphql/mutations";

import awsExports from "@/aws-exports";

Amplify.configure(awsExports);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = generateClient();

    const { watchlistId, watchlistMovies } = JSON.parse(req.body);

    // Retrieve watchlist - movie connections
    const {
      data: {
        listWatchlistMovies: { items: allWatchlistMovies },
      },
    }: any = await client.graphql({
      query: listWatchlistMovies,
    });

    // Delete watchlist - movie connections
    await Promise.all(
      watchlistMovies.map(async (movie: Movie) => {
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

    // Delete the rest of the watchlist
    await client.graphql({
      query: deleteWatchlist,
      variables: {
        input: {
          id: watchlistId,
        },
      },
    });

    return res.status(200).json({ message: "Successfully deleted watchlist!" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong!", details: error });
  }
};

export default handler;
