export interface ICreateUsersProps {
  name: string;
  username: string;
  password?: string;
  email: string;
  roles: string[];
}

export interface IUpdateUsersProps extends ICreateUsersProps {
  id: string;
}
