import React, { useContext } from "react";
import { DialogContext } from "./BaseDialog";
import { DialogTitle, Typography, Box, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
// TODO: Function'ların render scope'ta olup olmaması olaylarına bak
// TODO: useeffect'te prevProp kullanımlarına bak
// TODO: Bu ikisine genel olarak her projede bak
const useStyles = makeStyles(theme => ({
  dialogTitle: {
    padding: theme.spacing(1, 2)
  },
  closeButton: {
    marginRight: theme.spacing(1)
  }
}));

function BaseDialogTitle({ children }) {
  const classes = useStyles();
  const { fullScreen, closeDialog } = useContext(DialogContext);

  return (
    <DialogTitle className={classes.dialogTitle} disableTypography>
      <Box display="flex" alignItems="center">
        {fullScreen && (
          <IconButton className={classes.closeButton} onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
        )}
        {typeof children === "string" ? (
          <Typography variant="h6">{children}</Typography>
        ) : (
          children
        )}
      </Box>
    </DialogTitle>
  );
}

export default BaseDialogTitle;
