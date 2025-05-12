import axios from "axios";
import type { Policy } from "../pages/PoliciesPage";

const API_BASE_URL = "http://localhost:3000";

export const getAllPolicies = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/policies/`);
  return response;
};

export const getPolicyById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/api/policies/${id}`);
  return response;
};

export const createPolicy = async (policy: Policy) => {
  const response = await axios.post(`${API_BASE_URL}/api/policies`, policy);
  return response;
};

export const getPolicyByPolicyNumber = async (policyNumber: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/policies/policyNumber/${policyNumber}`
  );
  return response;
};
