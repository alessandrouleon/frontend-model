import {
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
// import type { DialogProps } from "@mui/material/Dialog/Dialog";
// import { GridCloseIcon } from "@mui/x-data-grid";
import type { DialogProps } from "@mui/material";
// import { DataGrid } from '@mui/x-data-grid';
import GridCloseIcon from "@mui/icons-material/Close";

import * as React from "react";

import { COLORS } from "../../themes/colors";
import {
  ContainerTitle,
  DialogModal,
  ModalDeleteTitle,
  Subtitle,
} from "./styles";

interface DialogContainerProps extends DialogProps {
  open: boolean;
  handleClose?: () => void;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  width?: string;
  titleDelete?: string;
}

export default function DialogContainer({
  open,
  handleClose,
  children,
  title,
  subtitle,
  width = "",
  titleDelete,
  ...rest
}: DialogContainerProps) {
  return (
    <DialogModal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      {...rest}
      valuewidth={width}
    >
      <ContainerTitle>
        <DialogTitle>{title}</DialogTitle>
        {handleClose ? (
          <IconButton onClick={handleClose} size="large">
            {/* <GridCloseIcon */}
            <GridCloseIcon
              style={{
                color: `${COLORS.NEUTRAL_700}`,
                fontSize: "large",
              }}
            />
          </IconButton>
        ) : null}
      </ContainerTitle>
      <Subtitle>{subtitle}</Subtitle>
      <ModalDeleteTitle>{titleDelete}</ModalDeleteTitle>
      <DialogContent
        style={{
          padding: "0.625rem",
          margin: "1.3rem",
        }}
      >
        {children}
      </DialogContent>
    </DialogModal>
  );
}
