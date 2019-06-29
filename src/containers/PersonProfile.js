import React, { useEffect } from "react";
import { Typography, Box, Card, CardContent } from "@material-ui/core";
import PersonIntroduction from "containers/PersonIntroduction";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerson } from "actions";
import PersonInfoSection from "containers/PersonInfoSection";
import LoadingIndicator from "components/LoadingIndicator";
import { selectIsFetchingPerson } from "reducers";
import PersonCastingGridList from "./PersonCastingGridList";

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
    dispatch(fetchPerson(personId, ["biography", "imdb_id"]));
  }, [personId, dispatch]);

  return (
    <>
      <LoadingIndicator loading={isFetching}>
        <PersonIntroduction personId={personId} />
      </LoadingIndicator>
      <Box my={1}>
        <Box display="flex" flexWrap="wrap">
          <Box flex={10} flexBasis={600}>
            <Typography variant="h6" gutterBottom>
              Castings
            </Typography>
            <PersonCastingGridList personId={personId} />
          </Box>
          <Box flex={1} flexBasis={250} marginLeft={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personal Info
                </Typography>
                <PersonInfoSection personId={personId} />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PersonProfile;
