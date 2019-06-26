import React from "react";
import { CardHeader } from "@material-ui/core";
import BaseImage from "components/BaseImage";
import BaseCard from "components/BaseCard";
import { useSelector } from "react-redux";
import RouterLink from "components/RouteLink";
import { makeStyles } from "@material-ui/styles";
import { selectPerson } from "reducers";
import { getImageUrl } from "utils";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none"
  },
  cardTitle: {
    fontWeight: theme.typography.fontWeightBold
  }
}));

function PersonCard({ personId }) {
  const classes = useStyles();
  const person = useSelector(state => selectPerson(state, personId));

  return (
    <RouterLink className={classes.link} to={`/person/${personId}`}>
      <BaseCard hasActionArea>
        <BaseImage
          src={getImageUrl(person.profile_path)}
          alt={person.name}
          aspectRatio="2:3"
        />
        <CardHeader
          title={person.name}
          titleTypographyProps={{
            variant: "subtitle1",
            className: classes.cardTitle
          }}
          subheaderTypographyProps={{ variant: "subtitle2" }}
        />
      </BaseCard>
    </RouterLink>
  );
}

export default PersonCard;
