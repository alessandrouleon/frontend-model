 import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { Dashboards } from "../page/dashboards";
import { Users } from "../page/users";

export const APP_PAGES = [
   {
    title: "Dashboards",
    route: "/dashBoard",
    icon: <SpaceDashboardIcon />,
    component: <Dashboards />,
    showMenu: true,
  },

  {
    title: "Usuários",
    route: "/users",
    icon: <PeopleAltIcon />,
    component: <Users />,
    showMenu: true,
  },
  
];
