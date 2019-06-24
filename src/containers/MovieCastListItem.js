import React from "react";
import { useSelector } from "react-redux";
import { selectCastCreditById, selectPersonById } from "reducers/entities";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import { BASE_IMG_API } from "actions";
import RouterLink from "components/RouteLink";

const useStyles = makeStyles(theme => ({
  secondaryText: {
    wordBreak: "break-word"
  }
}));

function MovieCastListItem({ castCreditId }) {
  const classes = useStyles();
  const cast = useSelector(state => selectCastCreditById(state, castCreditId));
  const person = useSelector(state => selectPersonById(state, cast.person));

  return (
    <ListItem
      className={classes.listItem}
      button
      alignItems="flex-start"
      to={`/person/${person.id}`}
      component={RouterLink}
    >
      <ListItemAvatar>
        <Avatar
          src={
            person.profile_path
              ? `${BASE_IMG_API}/w300${person.profile_path}`
              : ""
          }
          alt={person.name}
        />
      </ListItemAvatar>
      <ListItemText
        classes={{ secondary: classes.secondaryText }}
        primary={person.name}
        secondary={cast.character}
      />
    </ListItem>
  );
}

export default MovieCastListItem;
