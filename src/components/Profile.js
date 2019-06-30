import React from "react";
import { Box } from "@material-ui/core";
import LoadingIndicator from "components/LoadingIndicator";

function Profile({ loading, introduction, mainSection, sideSection }) {
  return (
    <LoadingIndicator loading={loading}>
      <Box padding={1}>{introduction}</Box>
      <Box display="flex" flexWrap="wrap">
        <Box flex={10} flexBasis={500} padding={1}>
          {mainSection}
        </Box>
        <Box flex={1} flexBasis={220} padding={1}>
          {sideSection}
        </Box>
      </Box>
    </LoadingIndicator>
  );
}

export default Profile;
