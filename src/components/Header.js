import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  makeStyles,
  Box,
  IconButton
} from "@material-ui/core";
import RouterLink from "./RouteLink";
import MultiAutoSearch from "containers/MultiAutoSearch";
import DrawerToggleButton from "containers/DrawerToggleButton";
import useDetectMobile from "hooks/useDetectMobile";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  titleLink: {
    "&:hover": {
      textDecoration: "none"
    }
  },
  closeMobileSearchButton: {
    marginRight: theme.spacing(2)
  },
  searcher: {
    maxWidth: 680
  }
}));

function Header() {
  const classes = useStyles();
  const isMobile = useDetectMobile();
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  function showMobileSearch() {
    setIsMobileSearch(true);
  }

  function hideMobileSearch() {
    setIsMobileSearch(false);
  }

  return (
    <AppBar color="default">
      <Toolbar>
        {!isMobileSearch && (
          <Link
            className={classes.titleLink}
            to="/movie/popular"
            color="inherit"
            component={RouterLink}
          >
            <Typography variant="h6">TMDB</Typography>
          </Link>
        )}

        {isMobile ? (
          <>
            {isMobileSearch ? (
              <>
                <IconButton
                  className={classes.closeMobileSearchButton}
                  onClick={hideMobileSearch}
                >
                  <CloseIcon />
                </IconButton>
                <MultiAutoSearch autoFocus />
              </>
            ) : (
              <>
                <Box flex={1} />
                <IconButton onClick={showMobileSearch}>
                  <SearchIcon />
                </IconButton>
              </>
            )}
          </>
        ) : (
          <Box flex={1} mx={2} display="flex" justifyContent="center">
            <MultiAutoSearch className={classes.searcher} />
          </Box>
        )}

        {!isMobileSearch && <DrawerToggleButton />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
