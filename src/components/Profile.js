import React from "react";
import { Box } from "@material-ui/core";
import LoadingIndicator from "components/LoadingIndicator";

function Profile({ loading, introduction, main, side }) {
  return (
    <LoadingIndicator loading={loading}>
      <Box padding={1}>{introduction}</Box>
      <Box display="flex" flexWrap="wrap">
        <Box flex={10} flexBasis={500} padding={1}>
          {main}
        </Box>
        <Box flex={1} flexBasis={220} padding={1}>
          {side}
        </Box>
      </Box>
    </LoadingIndicator>
  );
}

export default Profile;
