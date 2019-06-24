import React from "react";
import { BASE_IMG_API } from "actions";
import { CardHeader } from "@material-ui/core";
import BaseImage from "components/BaseImage";
import BaseCard from "components/BaseCard";
import { useSelector } from "react-redux";
import RouterLink from "components/RouteLink";
import { makeStyles } from "@material-ui/styles";
import { selectPersonById } from "reducers/entities";

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
  const person = useSelector(state => selectPersonById(state, personId));

  return (
    <RouterLink className={classes.link} to={`/person/${personId}`}>
      <BaseCard hasActionArea>
        <BaseImage
          src={`${BASE_IMG_API}/w500${person.profile_path}`}
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
