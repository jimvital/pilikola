import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add,
  Home,
  MoreVert,
  Person,
  Search,
  Theaters,
} from "@mui/icons-material";

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
      {isWatchlistPage ? null : (
        <>
          <Divider className="mx-0 my-[16px]" />
          <Typography>My Lists</Typography>
          <TextField
            placeholder="Search"
            size="small"
            margin="normal"
            InputProps={{
              type: "search",
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" gap="8px" alignItems="center">
            <Avatar className="w-[24px] h-[24px] text-sm">W</Avatar>
            <Link href="/watchlists/w1" underline="hover" variant="body2">
              Watchlist 1
            </Link>
          </Box>
        </>
      )}
      <Card className="mt-auto">
        <CardHeader
          avatar={<Person />}
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title="Guest"
        />
      </Card>
    </Stack>
  );
};

export default Drawer;
