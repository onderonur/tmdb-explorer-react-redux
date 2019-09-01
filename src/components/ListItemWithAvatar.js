import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import { getImageUrl } from "utils";

const useStyles = makeStyles(theme => ({
  secondaryText: {
    wordBreak: "break-word"
  }
}));

function ListItemWithAvatar({
  avatarUrl,
  primaryText,
  secondaryText,
  ...props
}) {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start" {...props}>
      <ListItemAvatar>
        <Avatar src={getImageUrl(avatarUrl)} alt={"Avatar"} />
      </ListItemAvatar>
      <ListItemText
        classes={{
          secondary: classes.secondaryText
        }}
        primary={primaryText}
        secondary={secondaryText}
      />
    </ListItem>
  );
}

export default ListItemWithAvatar;
