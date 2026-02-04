import api from "../api";
import type {
  ICreateUsersProps,
  IUpdateUsersProps
} from "./interfaces";

export const createUser = async (data: ICreateUsersProps) => {
  return await api.post(`/users/`, data);
};

export const updateUser = async (id: string, data: IUpdateUsersProps) => {
  return await api.patch(`/users/${id}`, {
    name: data.name.trim(),
    username: data.username.trim(),
    email: data.email.trim(),
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

