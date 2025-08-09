import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

interface Claim {
  policyId: string;
  treatmentDetails: string;
  amountRequested: number;
  lossDate: Date;
  lossTime: Date;
}

// Define the ClaimDocument interface
interface ClaimDocument {
  claimDocumentId: number;
  claimId: number;
  fileUrl: string;
  originalFileName: string;
  createdAt: string;
  updatedAt: string;
}

export const getAllClaims = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/claims/userclaims`);
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

export const approveClaim = async (claimId: number) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/claims/${claimId}/approve`
  );
  return response;
};

export const rejectClaim = async (claimId: number) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/claims/${claimId}/reject`
  );
  return response;
};

export const deleteClaim = async (claimId: number) => {
  return axios.delete(`${API_BASE_URL}/api/claims/${claimId}`);
};

// New functions for claim document management
export const uploadClaimDocument = async (claimId: number, file: File) => {
  const formData = new FormData();
  formData.append('claimDocument', file);
  
  const response = await axios.post(
    `${API_BASE_URL}/api/claims/${claimId}/documents`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response;
};

export const getClaimDocuments = async (claimId: number) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/claims/${claimId}/documents`
  );
  return response.data as ClaimDocument[];
};

export const deleteClaimDocument = async (claimId: number, documentId: number) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/claims/${claimId}/documents/${documentId}`
  );
  return response;
};
