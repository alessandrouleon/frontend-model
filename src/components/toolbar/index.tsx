import AddIcon from "@mui/icons-material/Add";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { ROLES } from "../../contexts/hooks/enums/roles.enums";
import { useAuth } from "../../contexts/hooks/useAuth";
import { COLORS } from "../../themes/colors";

interface HeaderProps {
  titleModule: string;
  onSearch: (searchValue: string) => void;
  handleSave: () => void;
}

export function Toolbar({ titleModule, onSearch, handleSave }: HeaderProps) {
  const [searchValue, setSearchValue] = React.useState("");
  const { hasRole } = useAuth();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClearSearch = useCallback(() => {
    setSearchValue("");
    onSearch("");
  }, [onSearch]);

  useEffect(() => {
    if (searchValue === "") {
      handleClearSearch();
    }
  }, [searchValue, handleClearSearch, hasRole]);

  const clearSearchButton = (
    <IconButton
      edge="end"
      onClick={handleClearSearch}
      disabled={searchValue.trim().length === 0}
    >
      <CleaningServicesIcon />
    </IconButton>
  );

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

        <Grid size={{ xs: 12, md: 9 }} style={{ textAlign: "right" }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Pesquisar..."
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "6rem" },
              minWidth: { xs: "100%", md: "100%" },
            }}
            value={searchValue}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ pr: 1 }}>
                  {clearSearchButton}
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Grid>

        <Grid style={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            onClick={handleSave}
            disabled={!hasRole(ROLES.ADMIN)}
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
