import { 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  IsOptional, 
  IsDateString, 
  IsPositive, 
  MaxLength, 
  MinLength,
  Matches,
  ValidateIf
} from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApplicationStatus } from "../enums/application-status.enum";

export class CreatePolicyDto {
  @ApiProperty({
    description: 'The unique identifier of the insurance product',
    example: 1001,
    type: Number
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  @IsNotEmpty()
  readonly productId: number;

  @ApiPropertyOptional({
    description: 'The current status of the policy application',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
    example: ApplicationStatus.PENDING
  })
  @IsOptional()
  @IsEnum(ApplicationStatus, {
    message: 'Status must be one of the following: ' + Object.values(ApplicationStatus).join(', ')
  })
  readonly status?: ApplicationStatus;

  @ApiPropertyOptional({
    description: 'Unique policy number in format POL-YYYYMMDD-XXXXX',
    example: 'POL-20230615-12345',
    type: String
  })
  @IsOptional()
  @IsString()
  @MinLength(15)
  @MaxLength(20)
  @Matches(/^POL-\d{8}-\d{5}$/, {
    message: 'Policy number must be in format POL-YYYYMMDD-XXXXX'
  })
  readonly policyNumber?: string;

  @ApiPropertyOptional({
    description: 'The date when the policy coverage begins',
    example: '2023-06-15T00:00:00.000Z',
    type: Date
  })
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  readonly startDate?: Date;

  @ApiPropertyOptional({
    description: 'The date when the policy coverage ends',
    example: '2024-06-14T23:59:59.999Z',
    type: Date
  })
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  @ValidateIf((o) => o.startDate !== undefined)
  readonly endDate?: Date;

  @ApiPropertyOptional({
    description: 'The premium amount for the policy',
    example: 1200.50,
    type: Number
  })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  readonly premiumAmount?: number;

  @ApiPropertyOptional({
    description: 'The deductible amount for the policy',
    example: 500,
    type: Number
  })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  readonly deductibleAmount?: number;

  @ApiPropertyOptional({
    description: 'The maximum coverage limit for the policy',
    example: 1000000,
    type: Number
  })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  readonly coverageLimit?: number;

  constructor(
    productId: number,
    status: ApplicationStatus = ApplicationStatus.PENDING,
    policyNumber?: string,
    startDate?: Date,
    endDate?: Date,
    premiumAmount?: number,
    deductibleAmount?: number,
    coverageLimit?: number
  ) {
    this.productId = productId;
    this.status = status;
    this.policyNumber = policyNumber;
    this.startDate = startDate;
    this.endDate = endDate;
    this.premiumAmount = premiumAmount;
    this.deductibleAmount = deductibleAmount;
    this.coverageLimit = coverageLimit;
  }

  /**
   * Creates a new CreatePolicyDto instance from an HTTP request body
   * @param req The HTTP request body containing policy data
   * @returns A new CreatePolicyDto instance with default values applied
   */
  static fromRequestBody(req: any): CreatePolicyDto {
    // Generate a policy number if not provided
    const policyNumber = req.policyNumber || CreatePolicyDto.generatePolicyNumber();
    
    // Set default dates if not provided
    const now = new Date();
    const startDate = req.startDate ? new Date(req.startDate) : now;
    
    // Default end date to 1 year from start date if not provided
    const endDate = req.endDate ? new Date(req.endDate) : new Date(startDate);
    if (!req.endDate) {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    
    return new CreatePolicyDto(
      req.productId,
      req.status || ApplicationStatus.PENDING,
      policyNumber,
      startDate,
      endDate,
      req.premiumAmount,
      req.deductibleAmount,
      req.coverageLimit
    );
  }

  /**
   * Generates a unique policy number in the format POL-YYYYMMDD-XXXXX
   * @returns A formatted policy number string
   */
  private static generatePolicyNumber(): string {
    const date = new Date();
    const dateStr = date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0');
    
    // Generate a random 5-digit number
    const random = Math.floor(10000 + Math.random() * 90000);
    
    return `POL-${dateStr}-${random}`;
  }
}
