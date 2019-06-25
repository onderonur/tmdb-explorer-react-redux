import React from "react";
import { useSelector } from "react-redux";
import { selectPersonById } from "reducers";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import { getImageUrl } from "utils";

function PersonListItem({ personId }) {
  const person = useSelector(state => selectPersonById(state, personId));

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          src={getImageUrl(person.person.profile_path)}
          alt={person.name}
        />
      </ListItemAvatar>
      <ListItemText primary={person.name} />
    </ListItem>
  );
}

export default PersonListItem;
