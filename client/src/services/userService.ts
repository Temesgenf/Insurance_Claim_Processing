import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

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
