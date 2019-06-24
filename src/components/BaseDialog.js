import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Dialog, DialogTitle } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: "fixed",
    top: theme.spacing(1),
    right: theme.spacing(3),
    cursor: "pointer"
  }
}));

function BaseDialog({ open, title, onExited, children }) {
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
      maxWidth="lg"
      onExited={onExited}
      onClose={handleClose}
    >
      <CloseIcon className={classes.closeButton} onClick={handleClose} />
      {typeof title === "string" ? <DialogTitle>{title}</DialogTitle> : title}
      {children}
    </Dialog>
  );
}

export default BaseDialog;
