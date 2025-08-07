import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PremiumRate } from "../common/enums/premium-rate.enum";
import { PlanStatus } from "../common/enums/plan-status.enum";
import { CoverageArea } from "../common/enums/coverage-area.enum";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  readonly productId!: number;

  @Column({
    type: "varchar",
    length: 50,
    unique: true,
    nullable: false,
  })
  readonly productCode!: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  readonly productName!: string;

  @Column({
    type: "decimal",
    precision: 12,
    scale: 2,
    nullable: false,
  })
  readonly sumInsured!: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  readonly basePremium!: number;

  @Column({
    type: "enum",
    enum: PremiumRate,
    nullable: false,
  })
  readonly premiumRate!: PremiumRate;

  @Column({
    type: "text",
    nullable: true,
  })
  readonly description!: string;

  @Column({
    type: "simple-array",
    nullable: true,
  })
  readonly keyBenefits!: string[];

  @Column({
    type: "simple-array",
    nullable: true,
  })
  readonly coverages!: string[];

  @Column({
    type: "enum",
    enum: CoverageArea,
    nullable: false,
  })
  readonly coverageArea!: CoverageArea; 
  @Column({
    type: "int",
    nullable: false,
    default: 12,
  })
  readonly policyTermMonths!: number; // Policy duration in months (e.g., 12 for annual)

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  readonly deductible!: number; // Deductible amount

  @Column({
    type: "decimal",
    precision: 5,
    scale: 2,
    nullable: true,
  })
  readonly costSharePercentage!: number; // Cost share percentage (e.g., 20%)

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  readonly outOfPocketMaximum!: number; // Out-of-pocket maximum

  @Column({
    type: "simple-array",
    nullable: true,
  })
  readonly eligibilityCriteria!: string[]; // e.g., age limits, residency requirements

  @Column({
    type: "simple-array",
    nullable: true,
  })
  readonly exclusions!: string[]; // Exclusions like pre-existing conditions

  @Column({
    type: "enum",
    enum: PlanStatus,
    nullable: false,
    default: PlanStatus.ACTIVE,
  })
  readonly status!: PlanStatus; // e.g., Active, Inactive, Discontinued

  @Column({
    type: "simple-json",
    nullable: true,
  })
  readonly additionalBenefits!: { [key: string]: string | number }; // Flexible JSON for specific benefits (e.g., maternity, evacuation)

  @Column({
    type: "timestamp",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  readonly createdAt!: Date;

  @Column({
    type: "timestamp",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  readonly updatedAt!: Date;
}