import { NextApiRequest, NextApiResponse } from "next";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";

import { getUser } from "@/graphql/queries";
import { createUser } from "@/graphql/mutations";

import awsExports from "@/aws-exports";

Amplify.configure(awsExports);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query;

    const { name, username } = JSON.parse(req.body);

    const client = generateClient();

    const {
      data: { getUser: currentUser },
    }: any = await client.graphql({
      query: getUser,
      variables: {
        cognitoId: userId,
      },
    });

    if (!currentUser) {
      await client.graphql({
        query: createUser,
        variables: {
          input: {
            cognitoId: userId,
            name,
            username,
          },
        },
      });
    }

    return res.status(200).json({ message: "User successfully synced!" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong!", details: error });
  }
};

export default handler;
