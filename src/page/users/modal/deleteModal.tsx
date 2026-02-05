import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useCallback } from "react";
import DialogContainer from "../../../components/dialog";
import { deleteUser } from "../../../services/users";
import { COLORS } from "../../../themes/colors";
import type { IDeleteModalProps } from "../interfaces";
import { FormFooter } from "../styles";

export function DeleteModal({
  user,
  open,
  setOpen,
  setAlert,
  setDataRefresh,
  dataRefresh,
}: IDeleteModalProps) {
  const handleClose = () => {
    setOpen(false);
    setDataRefresh(!dataRefresh);
  };

  const handleDelete = useCallback(async () => {
    try {
      const response = await deleteUser(user.id);

      if (response.status === 200) {
        setDataRefresh(!dataRefresh);
        setOpen(false);
        setAlert({
          open: true,
          message: "Usuário deletada com sucesso",
          type: "success",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        setAlert({
          open: true,
          message: message || "Internal server error",
          type: "error",
        });
      }
    }
  }, [user.id, dataRefresh, setDataRefresh, setOpen, setAlert]);

  return (
    <DialogContainer open={open} titleDelete="Deletar usuário" width="34rem">
      <Typography>
        Deseja deletar o usuário:
        <span
          style={{
            color: COLORS.NEUTRAL_800,
            fontWeight: "bold",
            marginLeft: "0.5rem",
          }}
        >
          {user.username}
        </span>
        ?
      </Typography>

      <FormFooter>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleDelete}>
          Deletar
        </Button>
      </FormFooter>
    </DialogContainer>
  );
}
