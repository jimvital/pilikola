import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { generateClient } from "aws-amplify/api";
import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from "aws-amplify/auth";
import { Card, CardHeader, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert, Person } from "@mui/icons-material";
import { useAuthenticator } from "@aws-amplify/ui-react";

import { createUser } from "@/graphql/mutations";
import { getUser } from "@/graphql/queries";

const UserCard: React.FC = () => {
  const {
    user: { userId },
    signOut,
  } = useAuthenticator((context) => [context.user]);

  const { push } = useRouter();

  const [userDetails, setUserDetails] = useState<FetchUserAttributesOutput>({});

  useEffect(() => {
    const syncUserDetails = async () => {
      try {
        const data = await fetchUserAttributes();
        const { name, preferred_username: username } = data;

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

        setUserDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    syncUserDetails();
  }, [userId]);

  const handleSignOut = () => {
    push(`/`);
    handleClose();
    signOut();
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className="mt-auto">
      <CardHeader
        avatar={<Person />}
        action={
          <>
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
          </>
        }
        title={userDetails.name}
      />
    </Card>
  );
};

export default UserCard;
