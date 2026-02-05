export interface IUsersProps {
  id: string;
  name: string;
  username: string;
  password?: string;
  email: string;
  roles: string[];
  isActive: boolean;
  actions?: React.ReactNode;
  createdAt: string;
}

interface IUsersData {
  users: IUsersProps[];
  total: number;
  currentPage: number;
  totlaPages: number;
}

export const initialStateData: IUsersData = {
  users: [],
  total: 0,
  currentPage: 1,
  totlaPages: 0,
};

export interface IFormCreateUsers {
  name: string;
  username: string;
  password?: string;
  email: string;
  roles: string[];
  isActive: boolean;
}

export interface IFormUpdateUsers {
  id: string;
  name: string;
  username: string;
  password?: string;
  email: string;
  roles: string[];
  isActive: boolean;
}

export const initialUsersUpdate: IFormUpdateUsers = {
  id: "",
  name: "",
  username: "",
  password: "",
  email: "",
  roles: [],
  isActive: false,
};

export interface IDeleteModalProps {
  user: IFormUpdateUsers;
  open: boolean;
  setOpen: (open: boolean) => void;
  setAlert: (data: {
    open: boolean;
    message: string;
    type: "error" | "success";
  }) => void;
  setDataRefresh: (refresh: boolean) => void;
  dataRefresh: boolean;
}


export interface ICreateUpdateModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setAlert: (alert: any) => void;
  setDataRefresh: (value: boolean) => void;
  dataRefresh: boolean;
  setPage: (page: number) => void;
  user?: IFormUpdateUsers | null;
}
