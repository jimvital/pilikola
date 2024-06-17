import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Add, Home, Theaters } from "@mui/icons-material";

import UserCard from "./UserCard";
import Watchlists from "./Watchlists";

const Drawer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isWatchlistPage = pathname === "/watchlists";

  return (
    <Stack height="100vh" padding="24px">
      <Typography variant="h4">PILIKOLA</Typography>
      <List>
        <ListItem disablePadding onClick={() => router.push("/")}>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => router.push("/watchlists")}>
          <ListItemButton>
            <ListItemIcon>
              <Theaters />
            </ListItemIcon>
            <ListItemText>Watchlists</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => router.push("/watchlists/create")}
      >
        Create Watchlist
      </Button>
      {isWatchlistPage ? null : <Watchlists />}
      <UserCard />
    </Stack>
  );
};

export default Drawer;
