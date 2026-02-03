import SendIcon from "@mui/icons-material/Send";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

import axios from "axios";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/alert";
import { InitialAlertProps } from "../../components/alert/interfaces";
import { useAuth } from "../../contexts/hooks/useAuth";
import { login } from "../../services/login";
import { COLORS } from "../../themes/colors";

interface FormTextFieldProps {
  username: string;
  password: string;
}

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(InitialAlertProps);
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormTextFieldProps> = async (data) => {
    try {
      const response = await login(data);
      const token = response.data.access_token;

      if (token && token.length !== 0) {
        signIn(token);
        navigate("/dashBoard");
      } else {
        setAlert({
          open: true,
          message: "Falha ao realizar login.",
          type: "error",
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
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        height: "100vh",
      }}
    >
      <Alert
        open={alert.open}
        onClose={() => setAlert({ ...alert, open: false })}
        message={alert.message}
        type={alert.type}
      />
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{
          background: COLORS.BACKGROUND_DARK,
          width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
          height: { xs: "auto", md: "70%" },
          padding: { xs: 2, md: 0 },
        }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              backgroundColor: COLORS.BACKGROUND_DARK,
              padding: { xs: 2, sm: 3 },
              gap: "1.5rem",
            }}
            width="100%"
          >
            <Typography
              variant="h5"
              fontWeight={500}
              color={COLORS.NEUTRAL_800}
              textAlign="center"
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                mb: 2,
              }}
            >
              Sistema de login
            </Typography>

            <Typography
              fontWeight={400}
              color={COLORS.NEUTRAL_700}
              textAlign="center"
              sx={{
                fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "0.9375rem" },
                mb: { xs: 3, md: 5 },
              }}
            >
              Informe usuário e senha para acessar o sistema.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} width="100%">
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
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                    },
                  }}
                />
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
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: { xs: "1.25rem", sm: "1.5rem" },
                            },
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
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
                  helperText={
                    errors?.password ? errors?.password.message : null
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    padding: { xs: "0.625rem 0", sm: "0.5rem" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "0.7rem" },
                    gap: { xs: 0.5, sm: 1, md: 0.5 },
                  }}
                >
                  Acessar
                  <SendIcon
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "1.25rem", md: "1rem" },
                    }}
                  />
                </Button>
              </Stack>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
