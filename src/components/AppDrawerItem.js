import React from "react";
import { ListItemIcon, ListItemText, ListItem } from "@material-ui/core";
import RouterLink from "components/RouterLink";
import { withRouter } from "react-router-dom";

function AppDrawerItem({ to, icon, title, location }) {
  return (
    <ListItem
      button
      to={to}
      component={RouterLink}
      selected={location.pathname === to}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
}

export default withRouter(AppDrawerItem);
