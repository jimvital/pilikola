import React, { PropsWithChildren } from "react";
import { Grid } from "@mui/material";
import Drawer from "./Drawer";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container spacing={1} height="100vh">
      <Grid item width="25%" bgcolor="#000000">
        <Drawer />
      </Grid>
      <Grid item width="75%" bgcolor="#191919">
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
