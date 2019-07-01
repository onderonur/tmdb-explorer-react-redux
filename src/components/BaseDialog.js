import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Dialog, withMobileDialog, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import BaseDialogTitle from "./BaseDialogTitle";

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: "fixed",
    top: theme.spacing(1),
    right: theme.spacing(3),
    cursor: "pointer"
  }
}));

export const DialogContext = React.createContext();

function BaseDialog({ open, fullScreen, title, onExited, children }) {
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
        <DialogContent>{children}</DialogContent>
      </DialogContext.Provider>
    </Dialog>
  );
}

export default withMobileDialog()(BaseDialog);
