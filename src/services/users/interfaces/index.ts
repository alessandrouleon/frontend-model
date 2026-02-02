export interface ICreateUsersProps {
  name: string;
  username: string;
  password?: string;
  email: string;
  roles: string[];
  isActive: boolean;
}

export interface IUpdateUsersProps extends ICreateUsersProps {
  id: string;
}
