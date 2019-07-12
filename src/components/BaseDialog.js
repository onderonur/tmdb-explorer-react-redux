import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Dialog,
  withMobileDialog,
  DialogContent,
  Box
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import BaseDialogTitle from "./BaseDialogTitle";

const DEFAULT_CONTENT_PADDING_Y = 1;
const DEFAULT_CONTENT_PADDING_X = 3;

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: "fixed",
    top: theme.spacing(1),
    right: theme.spacing(3),
    cursor: "pointer"
  }
}));

export const DialogContext = React.createContext();

function BaseDialog({
  open,
  fullScreen,
  title,
  onExited,
  zeroPaddingContent,
  children
}) {
  const classes = useStyles();
  const [show, setShow] = useState(open);

  function handleClose() {
    setShow(false);
  }

  useEffect(() => {
    setShow(open);
  }, [open]);

  return (
    <Dialog
      open={show}
      scroll="body"
      fullWidth
      fullScreen={fullScreen}
      maxWidth="lg"
      onExited={onExited}
      onClose={handleClose}
    >
      <DialogContext.Provider value={{ fullScreen, closeDialog: handleClose }}>
        {!fullScreen && (
          <CloseIcon className={classes.closeButton} onClick={handleClose} />
        )}
        <BaseDialogTitle>{title}</BaseDialogTitle>
        <DialogContent>
          {zeroPaddingContent ? (
            <Box
              marginY={-DEFAULT_CONTENT_PADDING_Y}
              marginX={-DEFAULT_CONTENT_PADDING_X}
            >
              {children}
            </Box>
          ) : (
            children
          )}
        </DialogContent>
      </DialogContext.Provider>
    </Dialog>
  );
}

export default withMobileDialog()(BaseDialog);
