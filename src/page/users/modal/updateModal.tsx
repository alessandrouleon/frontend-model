import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import type { DefaultValues, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import DialogContainer from "../../../components/dialog";
import { updateUser } from "../../../services/users";
import { listRoles } from "../../../utils/helps";
import type {
  IEditModalProps,
  IFormUpdateUsers,
} from "../interfaces";
import { FormModal } from "../styles";

export function UpdateModal({
  open,
  setOpen,
  setAlert,
  setDataRefresh,
  dataRefresh,
  user,
}: IEditModalProps) {
  const defaultValues: DefaultValues<IFormUpdateUsers> = {
    ...user,
  };
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormUpdateUsers>({
    defaultValues,
  });

  const handleClose = () => {
    setOpen(false);
    setDataRefresh(!dataRefresh);
  };


  const onSubmit: SubmitHandler<IFormUpdateUsers> = async (data) => {
    setLoading(true);
    try {
      const response = await updateUser(user.id, {
        ...data,
      });
      if (response.status === 200) {
        setDataRefresh(!dataRefresh);
        setOpen(false);
        reset();
        setAlert({
          open: true,
          message: "Usuário alterado com sucesso.",
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContainer
      open={open}
      title="Editar usuário"
      subtitle="Preencha o formulário do usuário."
    >
        <>
          <FormModal onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} width={450}>
              <Grid size={{ xs: 12, md: 6 }} >
                <TextField
                  id="username"
                  label="Usuário"
                  placeholder="Digite seu usuário..."
                  size="small"
                  fullWidth
                  {...register("username", {
                    required: {
                      value: true,
                      message: "🛈 Campo é obrigatório.",
                    },
                    maxLength: {
                      value: 50,
                      message: "🛈 Campo excedeu o limite de caracters.",
                    },
                    minLength: {
                      value: 3,
                      message: "🛈 Campo tem menos de 3 caracters.",
                    },
                  })}
                  error={!!errors?.username}
                  helperText={
                    errors?.username ? errors?.username.message : null
                  }
                />
              </Grid>
           
              <Grid size={{ xs: 12, md: 6 }} >
                <FormControl fullWidth size="small">
                  <InputLabel id="rolesId">Permissão</InputLabel>
                  <Select
                    labelId="rolesId"
                    id="rolesId"
                    label="Permissão"
                    {...register("roles", {
                      required: {
                        value: true,
                        message: "🛈 Campo é obrigatório.",
                      },
                      minLength: {
                        value: 3,
                        message: "🛈 Campo tem menos de 3 caracters.",
                      },
                      maxLength: {
                        value: 50,
                        message: "🛈 Campo excedeu o limite de 50 caracteres.",
                      },
                    })}
                    error={!!errors?.roles}
                    defaultValue={defaultValues.roles}
                  >
                    <MenuItem value="">
                      <em>Selecione item</em>
                    </MenuItem>
                    {listRoles.map((item) => (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.roles && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "0.7rem",
                        marginLeft: "1rem",
                        marginTop: "0.2rem",
                      }}
                    >
                      {errors.roles.message}
                    </p>
                  )}
                </FormControl>
              </Grid>
              {/* <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="statusId">Status</InputLabel>
                  <Select
                    labelId="statusId"
                    id="statusId"
                    label="Status"
                    {...register("status", {
                      required: {
                        value: true,
                        message: "🛈 Campo é obrigatório.",
                      },
                    })}
                    error={!!errors?.status}
                    defaultValue={defaultValues.status}
                  >
                    <MenuItem value="">
                      <em>Selecione item</em>
                    </MenuItem>
                    {listStatus.map((item) => (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.status && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "0.7rem",
                        marginLeft: "1rem",
                        marginTop: "0.2rem",
                      }}
                    >
                      {errors.status.message}
                    </p>
                  )}
                </FormControl>
              </Grid> */}
            </Grid>
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "2rem",
              }}
            >
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                disabled={loading}
                sx={{ ml: 2 }}
                variant="contained"
                type="submit"
              >
                {loading ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                    Salvando...
                  </>
                ) : (
                  "Salvar"
                )}
              </Button>
            </Box>
          </FormModal>
        </>
    </DialogContainer>
  );
}
