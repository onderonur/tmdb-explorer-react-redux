import React from "react";
import { useSelector } from "react-redux";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import RouterLink from "components/RouterLink";
import { getImageUrl } from "utils";
import { selectPerson } from "reducers";

const useStyles = makeStyles(theme => ({
  secondaryText: {
    wordBreak: "break-word"
  }
}));

function PersonListItem({ personId, secondaryText, button }) {
  const classes = useStyles();
  const person = useSelector(state => selectPerson(state, personId));

  return (
    <ListItem
      button={button}
      alignItems="flex-start"
      to={`/person/${person.id}`}
      component={RouterLink}
    >
      <ListItemAvatar>
        <Avatar src={getImageUrl(person.profile_path)} alt={person.name} />
      </ListItemAvatar>
      <ListItemText
        classes={{
          secondary: classes.secondaryText
        }}
        primary={person.name}
        secondary={secondaryText}
      />
    </ListItem>
  );
}

export default PersonListItem;
