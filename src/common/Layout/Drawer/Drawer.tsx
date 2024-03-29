import React from "react";
import {
  Autocomplete,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  InputAdornment,
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
  return (
    <Stack height="100vh" padding="24px">
      <Typography variant="h4">PILIKOLA</Typography>
      <List>
        <ListItem disablePadding>
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
      <Button variant="contained" startIcon={<Add />}>
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
