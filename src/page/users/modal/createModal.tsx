import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
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
import { useForm } from "react-hook-form";
import DialogContainer from "../../../components/dialog";
import type { ICreateModalProps } from "../../../components/dialog/styles";
import { createUser } from "../../../services/users";
import { listPermision } from "../../../utils/helps";
import type { IFormCreateUsers } from "../interfaces";
import { FormModal } from "../styles";

const defaultValues = {
  name: "",
  username: "",
  password: "",
  email: "",
  roles: [],
  isActive: true,
};

export function CreateModal({
  open,
  setOpen,
  setAlert,
  setDataRefresh,
  dataRefresh,
  setPage,
}: ICreateModalProps) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);

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
  } = useForm<IFormCreateUsers>({
    defaultValues,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<IFormCreateUsers> = async (data) => {
    setLoading(true);
    try {
      const response = await createUser({
        ...data,
        roles: Array.isArray(data.roles) ? data.roles : [data.roles],
        isActive: isSwitchChecked,
      });
      if (response.status === 201) {
        setPage(0);
        setDataRefresh(!dataRefresh);
        setOpen(false);
        reset();
        setAlert({
          open: true,
          message: "Usuário cadastrado com sucesso.",
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
      title="Cadastrar usuário"
      subtitle="Preencha o formulário do usuário."
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
              placeholder="Digite sua senha..."
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
              error={!!errors?.password}
              helperText={errors?.password ? errors?.password.message : null}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="rolesId">Permissão</InputLabel>
              <Select
                labelId="rolesId"
                id="rolesId"
                label="Permissão"
                multiple
                {...register("roles", {
                  required: {
                    value: true,
                    message: "🛈 Campo é obrigatório.",
                  },
                })}
                error={!!errors?.roles}
                defaultValue={[]}
              >
                {listPermision.map((item) => (
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

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
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
                Cadastrando...
              </>
            ) : (
              "Cadastrar"
            )}
          </Button>
        </Box>
      </FormModal>
    </DialogContainer>
  );
}
