import { Container, Typography, Box, Button, useMediaQuery } from "@mui/material";
import ImageNotFound from "../../assets/erro-404.svg";
import { COLORS } from "../../themes/colors";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const goBack = () => {
    navigate("/dashBoard");
  };

  return (
    <Container
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: isSmallScreen ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      maxWidth="lg"
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        marginBottom={isSmallScreen ? 2 : 0}
      >
        {/* <Typography
          variant="h1"
          fontWeight={700}
          color={COLORS.SECONDARY_900}
          fontSize={70}
          className="title"
        >
          ERRO 404
        </Typography> */}

        <Typography
          variant="subtitle1"
          fontWeight={400}
          color={COLORS.NEUTRAL_500}
          fontSize={32}
          className="subTitle"
        >
          Página não encontrada!
        </Typography>
        <Box marginTop={2}>
          <Button variant="contained" onClick={goBack}>
            Voltar ao Dashboard
          </Button>
        </Box>
      </Box>
      <Box
        width={isSmallScreen ? "100%" : "auto"}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <img src={ImageNotFound} alt="" style={{ width: isSmallScreen ? "70%" : "30rem" }} />
      </Box>
    </Container>
  );
}
