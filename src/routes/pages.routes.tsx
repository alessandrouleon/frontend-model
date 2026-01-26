 import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { Dashboards } from "../page/dashboards";
// import { ServiceOrder } from "../pages/serviceOrder";


export const APP_PAGES = [
   {
    title: "Dashboards",
    route: "/dashBoard",
    icon: <SpaceDashboardIcon />,
    component: <Dashboards />,
    showMenu: true,
  },
  //  {
  //   title: "Ordens de Serviço",
  //   route: "/serviceOrders",
  //   icon: <SpaceDashboardIcon />,
  //   component: <ServiceOrder />,
  //   showMenu: true,
  // },
  // {
  //   title: "Usuários",
  //   route: "/users",
  //   icon: <GroupIcon />,
  //   component: <Users />,
  //   showMenu: true,
  // },
  
];
