import React from "react";
import BaseImage from "components/BaseImage";
import BaseCard from "components/BaseCard";
import { useSelector } from "react-redux";
import RouterLink from "components/RouterLink";
import { makeStyles } from "@material-ui/styles";
import { selectors } from "reducers";
import { getImageUrl } from "utils";
import BaseCardHeader from "components/BaseCardHeader";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none"
  }
}));

function PersonCard({ personId }) {
  const classes = useStyles();
  const person = useSelector(state => selectors.selectPerson(state, personId));

  return (
    <RouterLink className={classes.link} to={`/person/${personId}`}>
      <BaseCard hasActionArea>
        <BaseImage
          src={getImageUrl(person.profile_path)}
          alt={person.name}
          aspectRatio="2:3"
        />
        <BaseCardHeader title={person.name} />
      </BaseCard>
    </RouterLink>
  );
}

export default PersonCard;
