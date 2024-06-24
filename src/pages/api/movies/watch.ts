import { NextApiRequest, NextApiResponse } from "next";
import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";

import { createUserMovies, deleteUserMovies } from "@/graphql/mutations";

import awsExports from "@/aws-exports";

Amplify.configure(awsExports);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = generateClient();

    const { movie, isWatched, watchedMovies, userId } = JSON.parse(req.body);

    if (isWatched) {
      const { relationId }: any = watchedMovies.find(
        (watched: any) => watched.tmdbId === movie.id
      );

      await client.graphql({
        query: deleteUserMovies,
        variables: {
          input: {
            id: relationId,
          },
        },
      });

      return res
        .status(200)
        .json({ message: "Successfully marked movie as unwatched!" });
    }

    await client.graphql({
      query: createUserMovies,
      variables: {
        input: {
          userCognitoId: userId,
          movieId: movie.dbId,
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully marked movie as watched!" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong!", details: error });
  }
};

export default handler;
