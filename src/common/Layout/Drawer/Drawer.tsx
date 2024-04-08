import React from "react";
import { useRouter } from "next/navigation";
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
  TrendingUp,
} from "@mui/icons-material";

const Drawer: React.FC = () => {
  const router = useRouter();

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
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TrendingUp />
            </ListItemIcon>
            <ListItemText>Popular Lists</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => router.push("/watchlist/create")}
      >
        Create Watchlist
      </Button>
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
        <Link href="/watchlist/w1" underline="hover" variant="body2">
          Watchlist 1
        </Link>
      </Box>
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
