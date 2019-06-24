import React from "react";
import { useSelector } from "react-redux";
import { selectPersonById } from "reducers/entities";
import BaseImage from "components/BaseImage";
import { BASE_IMG_API } from "actions";
import { Typography, makeStyles, Box, Grid, Link } from "@material-ui/core";
import LoadingIndicator from "components/LoadingIndicator";
import ImdbLogo from "components/ImdbLogo";
import { selectPersonIsFetching } from "reducers/isFetching";

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
  biography: {
    whiteSpace: "pre-wrap"
  }
}));

function PersonIntroduction({ personId }) {
  const person = useSelector(state => selectPersonById(state, personId));
  const isFetching = useSelector(state =>
    selectPersonIsFetching(state, personId)
  );
  const classes = useStyles({
    backgroundImage:
      isFetching || !person
        ? null
        : `${BASE_IMG_API}/w500${person.profile_path}`
  });

  return isFetching || !person ? (
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
              src={`${BASE_IMG_API}/w500${person.profile_path}`}
              alt={person.name}
              aspectRatio="2:3"
            />
          </Box>
          <Box p={2} flex={1} flexBasis={300}>
            <Typography variant="h5" gutterBottom>
              {person.name}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <Link
                    href={`https://www.imdb.com/title/${person.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ImdbLogo />
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Biography
                </Typography>
                <Typography className={classes.biography}>
                  {person.biography}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PersonIntroduction;
