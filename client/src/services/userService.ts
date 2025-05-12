import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const getAllUsers = async () => {
  return axios.get(`${API_BASE_URL}/api/users/usersall`);
};

export const deleteUser = async (userId: number) => {
  return axios.delete(`${API_BASE_URL}/api/users/${userId}`);
};

export const deactivateUser = async (userId: number) => {
  return axios.patch(`${API_BASE_URL}/api/users/${userId}/deactivate`);
};

export const updateUser = async (userId: number, userData: any) => {
  return axios.put(`${API_BASE_URL}/api/users/${userId}`, userData);
};
