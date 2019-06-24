import React from "react";
import { useSelector } from "react-redux";
import { selectPersonById } from "reducers/entities";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import { BASE_IMG_API } from "actions";

function PersonListItem({ personId }) {
  const person = useSelector(state => selectPersonById(state, personId));

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          src={`${BASE_IMG_API}/w500${person.profile_path}`}
          alt={person.name}
        />
      </ListItemAvatar>
      <ListItemText primary={person.name} />
    </ListItem>
  );
}

export default PersonListItem;
