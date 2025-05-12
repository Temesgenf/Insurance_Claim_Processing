import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Policy } from "./Policy";

@Entity()
export class Claim {
  @PrimaryGeneratedColumn()
  readonly claimId!: number;

  @Column({ name: "policyId" })
  policyId!: string;

  @Column({ type: "varchar", length: 50, unique: true, nullable: true })
  readonly claimNumber!: string;

  @Column({
    type: "varchar",
    length: 20,
    default: "pending",
  })
  status!: string;

  @Column({ type: "text", nullable: true })
  treatmentDetails!: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  amountRequested!: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  lossDate!: Date;
  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  lossTime!: Date;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
