// import { Box, Grid } from "@mui/material";
// import FundoBemVindo from "../../assets/bem_vindo.jpg";
import { Box } from "@mui/material";
import { COLORS } from "../../themes/colors";
export function Dashboards() {
  
  return (
    <div>
      <h1>Apresentação</h1>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ backgroundColor: COLORS.BACKGROUND_DARK }}
        mt={2}
      >
         {/* <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Box component="img" src={FundoBemVindo} alt="Fundo bem vindo"  width={1050} height={450}/>
        </Grid> */}
    
      </Box>
    </div>
  );
}
