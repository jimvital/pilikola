import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from "aws-amplify/auth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert, Person } from "@mui/icons-material";
import { useAuthenticator } from "@aws-amplify/ui-react";

const UserCard: React.FC = () => {
  const {
    user: { userId },
    signOut,
  } = useAuthenticator((context) => [context.user]);

  const { push } = useRouter();

  const syncUserDetails = async () => {
    const userAttributes = await fetchUserAttributes();
    const { name, preferred_username: username } = userAttributes;

    await fetch(`/api/user/${userId}`, {
      method: "POST",
      body: JSON.stringify({
        name,
        username,
      }),
    });

    return userAttributes;
  };

  const { data: userDetails } = useQuery<FetchUserAttributesOutput>({
    queryKey: ["users", userId],
    queryFn: syncUserDetails,
  });

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
        title={userDetails?.name}
      />
    </Card>
  );
};

export default UserCard;
