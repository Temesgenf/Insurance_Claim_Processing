import { Request, Response } from "express";
import PolicyService from "../services/policy.service";

export const getAllPolicies = async (req: Request, res: Response) => {
  try {
    const policy = await PolicyService.getAllPolicies();
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch policies" });
  }
};

export async function createPolicy(req: Request, res: Response) {
  try {
    const policy = await PolicyService.createPolicy(req.body);
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: "Failed to create policy" });
  }
}
