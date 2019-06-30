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
import { selectCastCredits, selectPerson } from "reducers";

const useStyles = makeStyles(theme => ({
  secondaryText: {
    wordBreak: "break-word"
  }
}));

function MovieCastGridListItem({ castCreditId }) {
  const classes = useStyles();
  const cast = useSelector(state => selectCastCredits(state, castCreditId));
  const person = useSelector(state => selectPerson(state, cast.person));

  return (
    <ListItem
      className={classes.listItem}
      button
      alignItems="flex-start"
      to={`/person/${person.id}`}
      component={RouterLink}
    >
      <ListItemAvatar>
        <Avatar src={getImageUrl(person.profile_path)} alt={person.name} />
      </ListItemAvatar>
      <ListItemText
        classes={{ secondary: classes.secondaryText }}
        primary={person.name}
        secondary={cast.character}
      />
    </ListItem>
  );
}

export default MovieCastGridListItem;
