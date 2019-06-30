import React, { useEffect } from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import PersonIntroduction from "containers/PersonIntroduction";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerson } from "actions";
import PersonInfoSection from "containers/PersonInfoSection";
import { selectIsFetchingPerson } from "reducers";
import PersonCastingGridList from "./PersonCastingGridList";
import Profile from "components/Profile";

function PersonProfile({
  match: {
    params: { personId }
  }
}) {
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    selectIsFetchingPerson(state, personId)
  );

  useEffect(() => {
    const requiredFields = ["biography", "imdb_id"];
    dispatch(fetchPerson(personId, requiredFields));
  }, [personId, dispatch]);

  return (
    <Profile
      loading={isFetching}
      introduction={<PersonIntroduction personId={personId} />}
      mainSection={
        <>
          <Typography variant="h6" gutterBottom>
            Castings
          </Typography>
          <PersonCastingGridList personId={personId} />
        </>
      }
      sideSection={
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Personal Info
            </Typography>
            <PersonInfoSection personId={personId} />
          </CardContent>
        </Card>
      }
    />
  );
}

export default PersonProfile;
