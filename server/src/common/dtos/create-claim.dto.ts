import { IsNotEmpty, IsString, IsDate, IsNumber } from "class-validator";
import { ClaimDocument } from "../../entities/Claim-Document";
import { ApplicationStatus } from "../enums/application-status.enum";

export class CreateClaimDto {
  constructor(
    public readonly policyId: string,
    public readonly treatmentDetails: string,
    public readonly amountRequested: number,
    public readonly lossDate: Date,
    public readonly lossTime: Date,
    public readonly user: object,
    public status?: ApplicationStatus,
    public claimDocument?: ClaimDocument,
    public claimNumber?: string
  ) {}

  // @IsNotEmpty()
  // @IsString()
  // policyId: string;

  // @IsNotEmpty()
  // @IsString()
  // treatmentDetails: string;

  // @IsNotEmpty()
  // @IsNumber()
  // amountRequested: number;

  // @IsNotEmpty()
  // @IsDate()
  // lossTime: Date;

  // @IsNotEmpty()
  // @IsDate()
  // lossDate: Date;

  static fromRequestBody(req: any): CreateClaimDto {
    console.log("req", req);
    return new CreateClaimDto(
      req.policyId,
      req.treatmentDetails,
      req.amountRequested,
      req.lossDate,
      req.lossTime,
      req.user,
      ApplicationStatus.PENDING
    );
  }
}
