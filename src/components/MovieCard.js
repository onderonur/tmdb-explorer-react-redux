import React from "react";
import BaseImage from "components/BaseImage";
import BaseCard from "components/BaseCard";
import { useSelector } from "react-redux";
import RouterLink from "components/RouterLink";
import { makeStyles } from "@material-ui/styles";
import { getImageUrl } from "utils";
import { selectors } from "reducers";
import BaseCardHeader from "components/BaseCardHeader";
import MovieRatingTag from "./MovieRatingTag";
import { getAspectRatioString } from "./AspectRatio";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none"
  }
}));

function MovieCard({ movieId, subheader }) {
  const classes = useStyles();
  const movie = useSelector(state => selectors.selectMovie(state, movieId));

  return (
    <RouterLink className={classes.link} to={`/movie/${movieId}`}>
      <BaseCard hasActionArea>
        <BaseImage
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          aspectRatio={getAspectRatioString(2, 3)}
        />
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <MovieRatingTag movieId={movieId} />
        </div>
        <BaseCardHeader title={movie.title} subheader={subheader} />
      </BaseCard>
    </RouterLink>
  );
}

export default MovieCard;
