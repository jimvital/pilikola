import React from "react";
import {
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Add, History, Home, MoreVert, Person } from "@mui/icons-material";

const Drawer: React.FC = () => {
  return (
    <Stack height="100%" padding="24px">
      <Typography variant="h4">PILIKOLA</Typography>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
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
