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
  History,
  Home,
  MoreVert,
  Person,
  Search,
} from "@mui/icons-material";

const Drawer: React.FC = () => {
  return (
    <Stack height="100%" padding="24px">
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
              <History />
            </ListItemIcon>
            <ListItemText>History</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Button variant="contained" startIcon={<Add />}>
        Create collection
      </Button>
      <Divider sx={{ margin: "16px 0" }} />
      <Typography>My lists</Typography>
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
      <Card sx={{ marginTop: "auto" }}>
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
