import { NextApiRequest, NextApiResponse } from "next";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";

import { listMovies, watchlistsByUserId } from "@/graphql/queries";

import awsExports from "@/aws-exports";

Amplify.configure(awsExports);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, movieId } = req.query;

    const client = generateClient();

    const {
      data: {
        watchlistsByUserId: { items: userWatchlists },
      },
    }: any = await client.graphql({
      query: watchlistsByUserId,
      variables: {
        userId,
      },
    });

    const {
      data: {
        listMovies: { items: filteredMovies },
      },
    }: any = await client.graphql({
      query: listMovies,
      variables: {
        filter: { tmdbId: { eq: movieId } },
      },
    });

    const listedIn =
      filteredMovies.length > 0 ? filteredMovies[0].listedIn.items : [];

    return res.status(200).json({ userWatchlists, listedIn });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong!", details: error });
  }
};

export default handler;
