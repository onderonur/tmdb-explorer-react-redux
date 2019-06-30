import React from "react";
import { useSelector } from "react-redux";
import { selectPerson } from "reducers";
import { Typography, makeStyles, Box, Grid, Link } from "@material-ui/core";
import ImdbLogo from "components/ImdbLogo";
import { getImageUrl, getImdbProfileUrl } from "utils";
import Introduction from "components/Introduction";

const useStyles = makeStyles(theme => ({
  biography: {
    whiteSpace: "pre-wrap"
  }
}));

function PersonIntroduction({ personId }) {
  const person = useSelector(state => selectPerson(state, personId));
  const classes = useStyles({
    backgroundImage: !person ? null : getImageUrl(person.profile_path)
  });

  return person ? (
    <Introduction
      imageSrc={person.profile_path}
      backgroundImage={person.profile_path}
      title={person.name}
      content={
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Link
                  href={getImdbProfileUrl(person.imdb_id)}
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
        </>
      }
    />
  ) : null;
}

export default PersonIntroduction;
