import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsOptional,
  IsEnum,
  IsObject,
  IsDateString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ClaimDocument } from "../../entities/Claim-Document";
import { ApplicationStatus } from "../enums/application-status.enum";

export class CreateClaimDto {
  @ApiProperty({
    description: "The unique identifier of the policy",
    example: "POL-20230615-12345",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  readonly policyId: string;

  @ApiProperty({
    description: "Details of the treatment or service provided",
    example: "Emergency room visit for broken arm",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  readonly treatmentDetails: string;

  @ApiProperty({
    description: "The amount requested for reimbursement",
    example: 1500.75,
    type: Number,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsNotEmpty()
  readonly amountRequested: number;

  @ApiProperty({
    description: "The date when the loss occurred",
    example: "2023-06-15",
    type: Date,
  })
  @IsDateString()
  @IsNotEmpty()
  @Type(() => Date)
  readonly lossDate: Date;

  @ApiProperty({
    description: "The time when the loss occurred",
    example: "14:30:00",
    type: Date,
  })
  @IsDateString()
  @IsNotEmpty()
  @Type(() => Date)
  readonly lossTime: Date;

  @ApiProperty({
    description: "The user submitting the claim",
    type: Object,
  })
  @IsObject()
  @IsNotEmpty()
  readonly user: object;

  @ApiPropertyOptional({
    description: "The current status of the claim",
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
    example: ApplicationStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  readonly status?: ApplicationStatus;

  @ApiPropertyOptional({
    description: "Supporting documentation for the claim",
    type: ClaimDocument,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClaimDocument)
  readonly claimDocument?: ClaimDocument;

  @ApiPropertyOptional({
    description: "Unique claim number in format CLM-YYYYMMDD-XXXXX",
    example: "CLM-20230615-12345",
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly claimNumber?: string;

  constructor(
    policyId: string,
    treatmentDetails: string,
    amountRequested: number,
    lossDate: Date,
    lossTime: Date,
    user: object,
    status: ApplicationStatus = ApplicationStatus.PENDING,
    claimDocument?: ClaimDocument,
    claimNumber?: string
  ) {
    this.policyId = policyId;
    this.treatmentDetails = treatmentDetails;
    this.amountRequested = amountRequested;
    this.lossDate = lossDate;
    this.lossTime = lossTime;
    this.user = user;
    this.status = status;
    this.claimDocument = claimDocument;
    this.claimNumber = claimNumber;
  }

  /**
   * Creates a new CreateClaimDto instance from an HTTP request body
   * @param req The HTTP request body containing claim data
   * @returns A new CreateClaimDto instance with default values applied
   */
  static fromRequestBody(req: any): CreateClaimDto {
    // Generate a claim number if not provided
    const claimNumber = req.claimNumber || CreateClaimDto.generateClaimNumber();

    return new CreateClaimDto(
      req.policyId,
      req.treatmentDetails,
      req.amountRequested,
      req.lossDate ? new Date(req.lossDate) : new Date(),
      req.lossTime ? new Date(req.lossTime) : new Date(),
      req.user,
      req.status || ApplicationStatus.PENDING,
      req.claimDocument,
      claimNumber
    );
  }

  /**
   * Generates a unique claim number in the format CLM-YYYYMMDD-XXXXX
   * @returns A formatted claim number string
   */
  private static generateClaimNumber(): string {
    const date = new Date();
    const dateStr =
      date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0");

    // Generate a random 5-digit number
    const random = Math.floor(10000 + Math.random() * 90000);

    return `CLM-${dateStr}-${random}`;
  }
}
