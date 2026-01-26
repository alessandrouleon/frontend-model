import { api } from "../api";
import type { UserProps } from "./interfaces";

export const login = ({ username, password }: UserProps) => {
  return api.post("auth/login-user", { username, password });
};
