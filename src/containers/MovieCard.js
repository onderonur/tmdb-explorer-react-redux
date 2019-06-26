import React from "react";
import { CardHeader } from "@material-ui/core";
import BaseImage from "components/BaseImage";
import BaseCard from "components/BaseCard";
import { useSelector } from "react-redux";
import RouterLink from "components/RouteLink";
import { makeStyles } from "@material-ui/styles";
import { getImageUrl } from "utils";
import { selectMovie } from "reducers";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none"
  },
  cardTitle: {
    fontWeight: theme.typography.fontWeightBold
  }
}));

function MovieCard({ movieId, subheader }) {
  const classes = useStyles();
  const movie = useSelector(state => selectMovie(state, movieId));

  return (
    <RouterLink className={classes.link} to={`/movie/${movieId}`}>
      <BaseCard hasActionArea>
        <BaseImage
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          aspectRatio="2:3"
        />
        <CardHeader
          title={movie.title}
          subheader={subheader}
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

export default MovieCard;
