import React from "react";
import { BASE_IMG_API } from "actions";
import { CardHeader } from "@material-ui/core";
import BaseImage from "components/BaseImage";
import BaseCard from "components/BaseCard";
import { selectMovieById } from "reducers/entities";
import { useSelector } from "react-redux";
import RouterLink from "components/RouteLink";
import { makeStyles } from "@material-ui/styles";

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
  const movie = useSelector(state => selectMovieById(state, movieId));

  return (
    <RouterLink className={classes.link} to={`/movie/${movieId}`}>
      <BaseCard hasActionArea>
        <BaseImage
          src={`${BASE_IMG_API}/w500${movie.poster_path}`}
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
