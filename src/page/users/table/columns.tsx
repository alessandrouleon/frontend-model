import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import Tooltip from "@mui/material/Tooltip";
import { COLORS } from "../../../themes/colors";
import { formatTime } from "../../../utils/date";
import type { IUsersProps } from "../interfaces";

interface Column {
  id:
    | "id"
    | "name"
    | "username"
    | "email"
    | "roles"
    | "isActive"
    | "createdAt"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
  renderCell?: (params: { row: IUsersProps }) => React.ReactNode;
}

export const columns: readonly Column[] = [
  {
    id: "name",
    label: "Nome",
    minWidth: 30,
    align: "center",
  },
  {
    id: "username",
    label: "Nome de Usuário",
    minWidth: 30,
    align: "center",
  },
  {
    id: "email",
    label: "E-mail",
    minWidth: 50,
    align: "center",
  },
  {
    id: "roles",
    label: "Permição",
    minWidth: 50,
    align: "center",
    renderCell: (params) => {
      return params.row.roles.join(", ");
    },
  },
  {
    id: "isActive",
    label: "Status",
    minWidth: 20,
    align: "center",
    renderCell: (params) => {
      return params.row.isActive === true ? (
        <Tooltip title="Activo">
          <ToggleOnIcon style={{ color: COLORS.SUCCESS_A700 }} />
        </Tooltip>
      ) : (
        <Tooltip title="Inativo">
          <ToggleOffIcon style={{ color: COLORS.NEUTRAL_400 }} />
        </Tooltip>
      );
    },
  },
  {
    id: "createdAt",
    label: "Data de criação",
    minWidth: 200,
    align: "center",
    renderCell: (params) => {
      return formatTime(params.row.createdAt);
    },
  },

  {
    id: "actions",
    label: "Ações",
    minWidth: 100,
    align: "center",
  },
];
