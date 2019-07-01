import React, { useEffect } from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import PersonIntroduction from "containers/PersonIntroduction";
import { useDispatch } from "react-redux";
import { fetchPerson } from "actions";
import PersonInfo from "containers/PersonInfo";
import PersonCastingGridList from "./PersonCastingGridList";
import Profile from "components/Profile";

const REQUIRED_FIELDS = ["biography", "imdb_id"];

function PersonProfile({
  match: {
    params: { personId }
  }
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPerson(personId, REQUIRED_FIELDS));
  }, [personId, dispatch]);

  return (
    <Profile
      introduction={<PersonIntroduction personId={personId} />}
      leftSide={
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Personal Info
            </Typography>
            <PersonInfo personId={personId} />
          </CardContent>
        </Card>
      }
      main={
        <>
          <Typography variant="h6" gutterBottom>
            Castings
          </Typography>
          <PersonCastingGridList personId={personId} />
        </>
      }
    />
  );
}

export default PersonProfile;
