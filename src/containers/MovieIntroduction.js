import React from "react";
import { useSelector } from "react-redux";
import { selectMovie } from "reducers";
import { Typography, makeStyles, Box, Grid, Link } from "@material-ui/core";
import Rating from "components/Rating";
import MovieGenreChip from "./MovieGenreChip";
import ImdbLogo from "components/ImdbLogo";
import { getMovieReleaseYear, getImdbProfileUrl } from "utils";
import Introduction from "components/Introduction";

const useStyles = makeStyles(theme => ({
  year: {
    color: theme.palette.text.secondary
  },
  tagline: {
    fontStyle: "italic"
  },
  genreChip: {
    margin: theme.spacing(0.5)
  },
  overview: {
    whiteSpace: "pre-wrap"
  }
}));

function MovieIntroduction({ movieId }) {
  const movie = useSelector(state => selectMovie(state, movieId));
  const classes = useStyles();

  const releaseYear = getMovieReleaseYear(movie);

  return movie ? (
    <Introduction
      backgroundImageSrc={movie.backdrop_path}
      imageSrc={movie.poster_path}
      title={
        <>
          <Typography variant="h5" gutterBottom={!movie.tagline}>
            {movie.title}{" "}
            {releaseYear && (
              <span className={classes.year}>{`(${getMovieReleaseYear(
                movie
              )})`}</span>
            )}
          </Typography>
          {movie.tagline && (
            <Typography
              className={classes.tagline}
              color="textSecondary"
              gutterBottom
            >
              {`"${movie.tagline}"`}
            </Typography>
          )}
        </>
      }
      content={
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Rating value={movie.vote_average * 10} />
                <Box marginLeft={2}>
                  <Link
                    href={getImdbProfileUrl(movie.imdb_id)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ImdbLogo />
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Genres
              </Typography>
              {movie.genres &&
                movie.genres.map(genreId => (
                  <MovieGenreChip
                    className={classes.genreChip}
                    key={genreId}
                    genreId={genreId}
                  />
                ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
              <Typography className={classes.overview} variant="body2">
                {movie.overview}
              </Typography>
            </Grid>
          </Grid>
        </>
      }
    />
  ) : null;
}

export default MovieIntroduction;
