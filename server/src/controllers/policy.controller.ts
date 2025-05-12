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

export async function approvePolicy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const updated = await PolicyService.approvePolicy(id);
    if (!updated) return res.status(404).json({ message: "Policy not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to approve policy", error });
  }
}

export async function rejectPolicy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const updated = await PolicyService.rejectPolicy(id);
    if (!updated) return res.status(404).json({ message: "Policy not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to reject policy", error });
  }
}

export async function deletePolicy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await PolicyService.deletePolicy(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete policy", error });
  }
}

