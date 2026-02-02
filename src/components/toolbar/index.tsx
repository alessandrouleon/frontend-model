import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Grid,
  Typography
} from "@mui/material";
import { COLORS } from "../../themes/colors";

interface HeaderProps {
  titleModule: string;
  handleSave: () => void;
}

export function Toolbar({
  titleModule,
  handleSave,
}: HeaderProps) {

  return (
    <>
      <Grid container mb={2} alignItems="center" justifyContent="space-between">
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: COLORS.NEUTRAL_800 }}
          mr={5}
        >
          {titleModule}
        </Typography>
        
        <Grid  style={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            onClick={handleSave}
            sx={{
              marginLeft: "0.5rem",
              padding: 0,
              borderRadius: 50,
              
            }}
          >
            <AddIcon fontSize="large" />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
