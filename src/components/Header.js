import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  makeStyles,
  Box,
  IconButton
} from "@material-ui/core";
import RouterLink from "./RouterLink";
import MovieAndPersonAutoSearch from "containers/MovieAndPersonAutoSearch";
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

const Header = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const isMobile = useDetectMobile();
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileSearch(false);
    }
  }, [isMobile]);

  function showMobileSearch() {
    setIsMobileSearch(true);
  }

  function hideMobileSearch() {
    setIsMobileSearch(false);
  }

  return (
    <AppBar ref={ref} color="default">
      <Toolbar>
        {(!isMobile || !isMobileSearch) && (
          <Link
            className={classes.titleLink}
            to="/movie/popular"
            color="inherit"
            component={RouterLink}
          >
            <Typography variant="h6">TMDb</Typography>
          </Link>
        )}

        {isMobile ? (
          isMobileSearch ? (
            <>
              <IconButton
                className={classes.closeMobileSearchButton}
                onClick={hideMobileSearch}
              >
                <CloseIcon />
              </IconButton>
              <MovieAndPersonAutoSearch autoFocus />
            </>
          ) : (
            <>
              <Box flex={1} />
              <IconButton onClick={showMobileSearch}>
                <SearchIcon />
              </IconButton>
            </>
          )
        ) : (
          <Box flex={1} mx={2} display="flex" justifyContent="center">
            <MovieAndPersonAutoSearch className={classes.searcher} />
          </Box>
        )}

        {!isMobileSearch && <DrawerToggleButton />}
      </Toolbar>
    </AppBar>
  );
});

export default Header;
