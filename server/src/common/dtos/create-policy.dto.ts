import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApplicationStatus } from "../enums/application-status.enum";

export class CreatePolicyDto {
  constructor(
    public productId: number,
    public status?: ApplicationStatus,
    public policyNumber?: string,
    public startDate?: Date,
    public endDate?: Date
  ) {
    (this.productId = productId),
      (this.policyNumber = policyNumber),
      (this.startDate = startDate),
      (this.endDate = endDate),
      (this.status = status);
  }

  static fromRequestBody(req: any): CreatePolicyDto {
    return new CreatePolicyDto(req.productId, ApplicationStatus.PENDING);
  }
}
