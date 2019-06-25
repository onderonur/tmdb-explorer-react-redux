import React, { useEffect } from "react";
import { Typography, Box, Card, CardContent } from "@material-ui/core";
import PersonIntroduction from "containers/PersonIntroduction";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerson } from "actions";
import PersonCastingList from "containers/PersonCastingList";
import PersonInfoSection from "containers/PersonInfoSection";
import { selectPersonIsFetching } from "reducers";
import LoadingIndicator from "components/LoadingIndicator";

function PersonProfile({
  match: {
    params: { personId }
  }
}) {
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    selectPersonIsFetching(state, personId)
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
          <Box flex={1} flexBasis={250}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personal Info
                </Typography>
                <PersonInfoSection personId={personId} />
              </CardContent>
            </Card>
          </Box>
          <Box flex={10} flexBasis={600} marginLeft={2}>
            <Typography variant="h6" gutterBottom>
              Castings
            </Typography>
            <PersonCastingList personId={personId} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PersonProfile;
