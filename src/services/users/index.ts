import api from "../api";
import type { ICreateUpdateUsersProps } from "./interfaces";

export const createUser = async (data: ICreateUpdateUsersProps) => {
  return await api.post(`/users/`, data);
};

export const updateUser = async (id: string, data: ICreateUpdateUsersProps) => {
  return await api.put(`/users/${id}`, {
    name: data.name.trim(),
    username: data.username.trim(),
    email: data.email.trim(),
    password: data.password?.trim() ? data.password.trim() : undefined,
    roles: data.roles.map((role) => role.trim()),
    isActive: data.isActive,
  });
};

export const findByUserId = async (id: string) => {
  return await api.get(`/users/${id}`);
};

export const deleteUser = async (id: string) => {
  return await api.delete(`/users/${id}`);
};

export const findManyUsers = async (page: number, size: number, search?: string) => {
  return api.get("/users", {
    params: {
      page,
      size,
      ...(search && {
        filter: {
          search,
        },
      }),
    },
  });
};

