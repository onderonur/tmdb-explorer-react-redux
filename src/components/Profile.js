import React from "react";
import { Box } from "@material-ui/core";
import LoadingIndicator from "components/LoadingIndicator";

function Profile({ loading, introduction, main, leftSide, rightSide }) {
  return (
    <LoadingIndicator loading={loading}>
      <Box margin={-1}>
        <Box padding={1}>{introduction}</Box>
        <Box display="flex" flexWrap="wrap">
          {leftSide && (
            <Box flex={1} flexBasis={240} padding={1}>
              {leftSide}
            </Box>
          )}
          <Box flex={10} flexBasis={500} padding={1}>
            {main}
          </Box>
          {rightSide && (
            <Box flex={1} flexBasis={220} padding={1}>
              {rightSide}
            </Box>
          )}
        </Box>
      </Box>
    </LoadingIndicator>
  );
}

export default Profile;
