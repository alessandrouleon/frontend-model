import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import DialogContainer from "../../../components/dialog";
import { createUser, updateUser } from "../../../services/users";
import { listPermision } from "../../../utils/helps";
import type { ICreateUpdateModalProps, IFormCreateUsers } from "../interfaces";
import { FormModal } from "../styles";

export function CreateUpdateModal({
  open,
  setOpen,
  setAlert,
  setDataRefresh,
  dataRefresh,
  setPage,
  user = null,
}: ICreateUpdateModalProps) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isEditing = !!user; //Verifica se é edição

  const [isSwitchChecked, setIsSwitchChecked] = useState(
    user?.isActive ?? true,
  );

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwitchChecked(event.target.checked);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IFormCreateUsers>({
    defaultValues: user
      ? {
          ...user,
          roles: Array.isArray(user.roles) ? user.roles : [],
        }
      : {
          name: "",
          username: "",
          password: "",
          email: "",
          roles: [],
          isActive: true,
        },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<IFormCreateUsers> = async (data) => {
    setLoading(true);
    try {
      let response;

      if (isEditing) {
        // Edição
        response = await updateUser(user.id, {
          ...data,
          roles: Array.isArray(data.roles) ? data.roles : [data.roles],
          isActive: isSwitchChecked,
          password: data.password?.trim() ?? null,
        });
      } else {
        // Criação
        response = await createUser({
          ...data,
          roles: Array.isArray(data.roles) ? data.roles : [data.roles],
          isActive: isSwitchChecked,
        });
      }

      if (response.status === 200 || response.status === 201) {
        setPage(0);
        setDataRefresh(!dataRefresh);
        setOpen(false);
        reset();
        setAlert({
          open: true,
          message: isEditing
            ? "Usuário atualizado com sucesso."
            : "Usuário cadastrado com sucesso.",
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
      title={isEditing ? "Editar usuário" : "Cadastrar usuário"}
      subtitle={
        isEditing
          ? "Atualize os dados do usuário."
          : "Preencha o formulário do usuário."
      }
    >
      <FormModal onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              id="name"
              label="Nome"
              placeholder="Digite o nome..."
              size="small"
              fullWidth
              {...register("name", {
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
              error={!!errors?.name}
              helperText={errors?.name ? errors?.name.message : null}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              id="username"
              label="Usuário"
              placeholder="Digite nome de usuário..."
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
              helperText={errors?.username ? errors?.username.message : null}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              id="email"
              label="Email"
              placeholder="Digite o email..."
              size="small"
              fullWidth
              {...register("email", {
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
              error={!!errors?.email}
              helperText={errors?.email ? errors?.email.message : null}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              id="password-id"
              label="Senha"
              placeholder={
                isEditing
                  ? "Deixe em branco para não alterar"
                  : "Digite sua senha..."
              }
              size="small"
              fullWidth
              type={showPassword ? "text" : "password"}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { fontSize: 14 },
              }}
              {...register("password", {
                required: {
                  value: !isEditing,
                  message: "🛈 Campo é obrigatório.",
                },
                maxLength: {
                  value: 50,
                  message: "🛈 Campo excedeu o limite de caracteres.",
                },
                minLength: {
                  value: 3,
                  message: "🛈 Campo tem menos de 3 caracteres.",
                },
                validate: {
                  validLength: (value) => {
                    if (
                      isEditing &&
                      value &&
                      value.trim().length > 0 &&
                      value.trim().length < 3
                    ) {
                      return "🛈 Campo tem menos de 3 caracteres.";
                    }
                    return true;
                  },
                },
              })}
              error={!!errors?.password}
              helperText={errors?.password ? errors?.password.message : null}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth size="small" error={!!errors?.roles}>
              <InputLabel id="rolesId">Permissão</InputLabel>
              <Controller
                name="roles"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "🛈 Campo é obrigatório.",
                  },
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="rolesId"
                    id="rolesId"
                    label="Permissão"
                    multiple
                    value={field.value || []}
                  >
                    {listPermision.map((item) => (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.roles && (
                <FormHelperText error>{errors.roles.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              component="div"
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <Box
                display="flex"
                justifyContent="start"
                alignItems="start"
                marginLeft={1}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: 16,
                  }}
                ></Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isSwitchChecked}
                        onChange={handleSwitchChange}
                      />
                    }
                    label={
                      isSwitchChecked ? (
                        <strong>Usuário ativo</strong>
                      ) : (
                        "Usuário inativo"
                      )
                    }
                  />
                </FormGroup>
              </Box>
            </Typography>
          </Grid>
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
                {isEditing ? "Atualizando..." : "Cadastrando..."}
              </>
            ) : isEditing ? (
              "Atualizar"
            ) : (
              "Cadastrar"
            )}
          </Button>
        </Box>
      </FormModal>
    </DialogContainer>
  );
}
