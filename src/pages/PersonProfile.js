import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import PersonIntroduction from "containers/PersonIntroduction";
import { useDispatch } from "react-redux";
import { fetchPersonRequest } from "actions";
import PersonInfo from "containers/PersonInfo";
import PersonCastingGridList from "containers/PersonCastingGridList";
import Profile from "components/Profile";
import { useParams } from "react-router-dom";

const REQUIRED_FIELDS = ["biography", "imdb_id"];

function PersonProfile() {
  const { personId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPersonRequest(personId, REQUIRED_FIELDS));
  }, [personId, dispatch]);

  return (
    <Profile
      introduction={<PersonIntroduction personId={personId} />}
      leftSide={
        <>
          <Typography variant="h6" gutterBottom>
            Personal Info
          </Typography>
          <PersonInfo personId={personId} />
        </>
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
