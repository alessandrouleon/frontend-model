export interface ICreateUpdateUsersProps {
  name: string;
  username: string;
  password?: string | null;
  email: string;
  roles: string[];
  isActive: boolean;
}
