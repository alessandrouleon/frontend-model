import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Avatar, Button, List, ListItem, Menu } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { signOut } from "../../contexts/Auth";
import { UserToken } from "../../services/localStorage";
import { COLORS } from "../../themes/colors";
import { Content } from "./content";
import { MenuList } from "./menuList";
import { AppBar, Drawer, DrawerHeader } from "./styles";

interface AppContainerProps {
  children?: React.ReactNode;
}

export function AppContainer({ children }: AppContainerProps) {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const username: string | null = UserToken.getLocalStorageName();


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

    const handleDrawerOpen = () => {
    setOpen(true);
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: COLORS.PRIMARY_500,
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>

         <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 0,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ color: COLORS.BACKGROUND_BASE }} />
            </IconButton>

            <Typography
              color={COLORS.BACKGROUND_BASE}
              variant="body1"
              noWrap
              component="div"
            >
              Bem-vindo, {username}
            </Typography>
          </Box>
          <div>
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
               <Avatar sx={{ width: 20, height: 20, color: COLORS.BACKGROUND_BASE, backgroundColor: COLORS.NEUTRAL_500}}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ mt: 5, mr: 4 }}
            >
              <Typography
                m={1}
                color={COLORS.NEUTRAL_800}
                fontSize={14}
                width={200}
              >
                <strong> Usuário: </strong>
                {username}
              </Typography>
              <Divider
                orientation="horizontal"
                variant="fullWidth"
                flexItem
                sx={{ backgroundColor: COLORS.BACKGROUND_BASE }}
              />
              <Box textAlign="start" mt={1}>
                <Button
                  fullWidth
                  variant="text"
                  onClick={signOut}
                  startIcon={<LogoutIcon />}
                  sx={{ justifyContent: "flex-start", borderRadius: "0" }}
                >
                  <Typography fontSize={12}>Sair</Typography>
                </Button>
              </Box>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            background: `${COLORS.PRIMARY_500}`,
            width: "100%",
          }}
        >
          <Typography
            color={COLORS.BACKGROUND_BASE}
            variant="body1"
            noWrap
            component="div"
            sx={{ ml: 2, flexGrow: 1 }}
          >
           Menu Lista
          </Typography>
          <IconButton
            color="primary"
            aria-label="open drawer"
            sx={{
              marginLeft: 0,
              color: COLORS.BACKGROUND_BASE,
            }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? <MenuOpenIcon /> : <MenuOpenIcon />}
          </IconButton>
        </DrawerHeader>
        <MenuList open={open} />
        {open && (
          <List style={{ marginTop: `auto` }}>
            <ListItem
              style={{ display: "flex", flexDirection: "column" }}
            ></ListItem>
          </List>
        )}
      </Drawer>

      <Content>{children}</Content>
    </Box>
  );
}
