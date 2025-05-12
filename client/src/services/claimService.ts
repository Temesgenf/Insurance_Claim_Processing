import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

interface Claim {
  policyId: string;
  treatmentDetails: string;
  amountRequested: number;
  lossDate: Date;
  lossTime: Date;
  user: object;
}

export const getAllClaims = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/claims`);
  return response;
};

export const getClaimById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/api/claims/${id}`);
  return response;
};

export const createClaim = async (claim: Claim) => {
  const response = await axios.post(`${API_BASE_URL}/api/claims`, claim);
  return response;
};
