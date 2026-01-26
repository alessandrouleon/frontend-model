import { Box, Grid } from "@mui/material";
import FundoBemVindo from "../../assets/bem_vindo.jpg";
import { COLORS } from "../../themes/colors";
export function Dashboards() {
  
  return (
    <div>
      <h2>Apresentação</h2>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ backgroundColor: COLORS.BACKGROUND_DARK }}
        mt={2}
      >
         <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
           <Box component="img" src={FundoBemVindo} alt="Fundo bem vindo"  width={1070} height={500}/>
        </Grid>
      </Box>
    </div>
  );
}
