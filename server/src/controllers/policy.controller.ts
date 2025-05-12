import { Request, Response } from "express";
import PolicyService from "../services/policy.service";
import { CreatePolicyDto } from "../common/dtos/create-policy.dto";

export const getAllPolicies = async (req: Request, res: Response) => {
  try {
    const policy = await PolicyService.getAllPolicies();
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch policies" });
  }
};

export async function createPolicy(req: Request, res: Response) {
  console.log("[createPolicy] req.body:", req.body);
  try {
    const policyDto = CreatePolicyDto.fromRequestBody(req.body);
    console.log("[createPolicy] policyDto:", policyDto);
    const policy = await PolicyService.createPolicy(policyDto);
    res.json(policy);
  } catch (error: any) {
    console.error("[createPolicy] Error:", error);
    res.status(500).json({
      message: "Failed to create policy",
      error: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
}

export async function getPolicyById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const policy = await PolicyService.getPolicyById(id);
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch policy", error });
  }
}

export async function getPolicyByPolicyNumber(req: Request, res: Response) {
  try {
    const policyNumber = req.params.policyNumber;
    const policy = await PolicyService.getPolicyByPolicyNumber(policyNumber);
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch policy", error });
  }
}
