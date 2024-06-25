import { NextApiRequest, NextApiResponse } from "next";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";

import { watchlistsByUserId } from "@/graphql/queries";

import awsExports from "@/aws-exports";

Amplify.configure(awsExports);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query;

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
    return res.status(200).json(userWatchlists);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong!", details: error });
  }
};

export default handler;
