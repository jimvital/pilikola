import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Card, CardHeader, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert, Person } from "@mui/icons-material";

import { DrawerContext } from "./DrawerContext";

const UserCard: React.FC = () => {
  const { userDetails } = useContext(DrawerContext);

  const { signOut } = useAuthenticator((context) => [context.user]);

  const { push } = useRouter();

  const handleSignOut = () => {
    push(`/`);
    handleClose();
    signOut();
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
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
