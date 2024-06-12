import React, { useEffect, useState } from "react";
import { Card, CardHeader, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert, Person } from "@mui/icons-material";
import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from "aws-amplify/auth";

const UserCard: React.FC = () => {
  const { signOut } = useAuthenticator();

  const [userDetails, setUserDetails] = useState<FetchUserAttributesOutput>({});

  useEffect(() => {
    async function getUserDetails() {
      const response = await fetchUserAttributes();

      setUserDetails(response);
    }

    getUserDetails();
  }, []);

  const handleSignOut = () => {
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
