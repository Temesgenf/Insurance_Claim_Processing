import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from "class-validator";
import { PremiumRate } from "../enums/premium-rate.enum";

export class CreateProductDto {
  constructor(
    productCode: string,
    productName: string,
    sumInsured: number,
    basePremium: number,
    premiumRate: PremiumRate,
    description: string,
    provider: { providerId: number },
    keyBenefits: string[]
  ) {
    this.productCode = productCode;
    this.productName = productName;
    this.sumInsured = sumInsured;
    this.basePremium = basePremium;
    this.premiumRate = premiumRate;
    this.description = description;
    this.provider = provider;
    this.keyBenefits = keyBenefits;
  }

  @IsString()
  @IsNotEmpty()
  readonly productCode: string;

  @IsString()
  @IsNotEmpty()
  readonly productName: string;

  @IsNumber()
  @IsNotEmpty()
  readonly sumInsured: number;

  @IsNumber()
  @IsNotEmpty()
  readonly basePremium: number;

  @IsEnum(PremiumRate)
  @IsNotEmpty()
  readonly premiumRate: PremiumRate;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsNotEmpty()
  readonly provider: { providerId: number };

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly keyBenefits?: string[];
}
