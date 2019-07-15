import React from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@material-ui/core";
import RouterLink from "components/RouterLink";
import { withRouter } from "react-router-dom";

function AppDrawerItem({ to, icon, title, location }) {
  return (
    <MenuItem
      to={to}
      button
      component={RouterLink}
      selected={location.pathname === to}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </MenuItem>
  );
}

export default withRouter(AppDrawerItem);
