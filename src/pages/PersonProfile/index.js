import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerson } from "actions";
import { useParams } from "react-router-dom";
import Profile from "components/Profile";
import PersonInfo from "./PersonInfo";
import PersonIntroduction from "./PersonIntroduction";
import PersonImageGridList from "./PersonImageGridList";
import PersonCastingGridList from "./PersonCastingGridList";
import { selectors } from "reducers";

const REQUIRED_FIELDS = ["biography", "imdb_id"];

function PersonProfile() {
  const dispatch = useDispatch();
  const { personId } = useParams();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingPerson(state, personId)
  );

  useEffect(() => {
    dispatch(fetchPerson(personId, REQUIRED_FIELDS));
  }, [personId, dispatch]);

  return (
    <Profile
      loading={isFetching}
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
            Images
          </Typography>
          <PersonImageGridList personId={personId} />

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
