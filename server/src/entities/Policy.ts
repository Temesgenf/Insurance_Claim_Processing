import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApplicationStatus } from "../common/enums/application-status.enum";

@Entity("policies")
@Unique(["policyNumber"]) // Ensures policy numbers are unique
export class Policy {
  @PrimaryGeneratedColumn()
  readonly policyId!: number;

  @Column({ name: "productId" })
  readonly productId!: number;

  @Column({
    type: "varchar",
    length: 50,
  })
  readonly policyNumber!: string;

  @Column({
    type: "date",
  })
  readonly startDate!: Date;

  @Column({
    type: "date",
  })
  readonly endDate!: Date;

  @Column({
    type: "enum",
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status!: ApplicationStatus;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  readonly premiumAmount?: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  readonly deductibleAmount?: number;

  @Column({
    type: "decimal",
    precision: 12,
    scale: 2,
    nullable: true,
  })
  readonly coverageLimit?: number;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
