import React from "react";
import { useSelector } from "react-redux";
import { selectMovieById } from "reducers/entities";
import BaseImage from "components/BaseImage";
import { BASE_IMG_API } from "actions";
import { Typography, makeStyles, Box, Grid, Link } from "@material-ui/core";
import LoadingIndicator from "components/LoadingIndicator";
import Rating from "components/Rating";
import MovieGenreChip from "./MovieGenreChip";
import ImdbLogo from "components/ImdbLogo";
import { getMovieReleaseYear } from "utils";
import { selectMovieIsFetching } from "reducers/isFetching";

const useStyles = makeStyles(theme => ({
  backdrop: {
    backgroundImage: ({ backgroundImage }) => `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    filter: "opacity(100) grayscale(100%) contrast(130%)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  top: {
    backgroundImage:
      "radial-gradient(circle at 20% 50%, rgba(12.55%, 24.71%, 34.51%, 0.98) 0%, rgba(12.55%, 24.71%, 34.51%, 0.88) 100%)"
  },
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
  const movie = useSelector(state => selectMovieById(state, movieId));
  const isFetching = useSelector(state =>
    selectMovieIsFetching(state, movieId)
  );
  const classes = useStyles({
    backgroundImage:
      isFetching || !movie ? null : `${BASE_IMG_API}/w500${movie.backdrop_path}`
  });

  return isFetching || !movie ? (
    <LoadingIndicator />
  ) : (
    <>
      <Box position="relative">
        <div className={classes.backdrop} />
        <Box
          className={classes.top}
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          position="relative"
          zIndex={1}
        >
          <Box flexBasis={300}>
            <BaseImage
              src={`${BASE_IMG_API}/w500${movie.poster_path}`}
              alt={movie.title}
              aspectRatio="2:3"
            />
          </Box>
          <Box p={2} flex={1} flexBasis={300}>
            <Typography variant="h5" gutterBottom={!movie.tagline}>
              {movie.title}{" "}
              <span className={classes.year}>{`(${getMovieReleaseYear(
                movie
              )})`}</span>
            </Typography>
            <Typography
              className={classes.tagline}
              color="textSecondary"
              gutterBottom
            >
              {`"${movie.tagline}"`}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <Rating value={movie.vote_average * 10} />
                  <Box marginLeft={2}>
                    <Link
                      href={`https://www.imdb.com/title/${movie.imdb_id}`}
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
                <Typography className={classes.overview}>
                  {movie.overview}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MovieIntroduction;
