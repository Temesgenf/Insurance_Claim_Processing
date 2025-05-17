import { CreatePolicyDto } from "../common/dtos/create-policy.dto";
import { Policy } from "../entities/Policy";
import { PolicyRepository } from "../repositories/policy.repository";
import { ApplicationStatus } from "../common/enums/application-status.enum";

class PolicyService {
  static async getAllPolicies() {
    return PolicyRepository.findAll();
  }

  static async createPolicy(policyDto: CreatePolicyDto) {
    // Use the DTO's built-in policy number generator instead of custom logic
    if (!policyDto.policyNumber) {
      const generatedPolicyDto = CreatePolicyDto.fromRequestBody({
        productId: policyDto.productId,
        premiumAmount: policyDto.premiumAmount,
        deductibleAmount: policyDto.deductibleAmount,
        coverageLimit: policyDto.coverageLimit
      });
      
      policyDto = generatedPolicyDto;
    }

    // Set timestamps for creation
    (policyDto as any).createdAt = new Date();
    (policyDto as any).updatedAt = new Date();
    
    return PolicyRepository.createPolicy(policyDto);
  }

  static async getPolicyById(id: number) {
    return PolicyRepository.findById(id);
  }

  static async getPolicyByPolicyNumber(policyNumber: string) {
    return PolicyRepository.findByPolicyNumber(policyNumber);
  }

  static async approvePolicy(id: number) {
    return PolicyRepository.updatePolicyStatus(id, ApplicationStatus.APPROVED);
  }

  static async rejectPolicy(id: number) {
    return PolicyRepository.updatePolicyStatus(id, ApplicationStatus.REJECTED);
  }

  static async deletePolicy(id: number) {
    return PolicyRepository.deletePolicy(id);
  }
}

export default PolicyService;
