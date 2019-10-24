import React from "react";
import { useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { toggleDrawer } from "actions";

function DrawerToggleButton() {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(toggleDrawer());
  }

  return (
    <IconButton onClick={handleClick}>
      <MenuIcon />
    </IconButton>
  );
}

export default DrawerToggleButton;
