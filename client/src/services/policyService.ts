import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const getAllPolicies = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/policies/`);
  return response;
};

export const getPolicyById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/api/policies/${id}`);
  return response;
};

export const createPolicy = async (policy: any) => {
  const response = await axios.post(`${API_BASE_URL}/api/policies`, policy);
  return response;
};

export const approvePolicy = async (policyId: number) => {
  return axios.put(`${API_BASE_URL}/api/policies/${policyId}/approve`);
};

export const rejectPolicy = async (policyId: number) => {
  return axios.put(`${API_BASE_URL}/api/policies/${policyId}/reject`);
};

export const deletePolicy = async (policyId: number) => {
  return axios.delete(`${API_BASE_URL}/api/policies/${policyId}`);
};

export const getPolicyByPolicyNumber = async (policyNumber: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/policies/policyNumber/${policyNumber}`
  );
  return response;
};
