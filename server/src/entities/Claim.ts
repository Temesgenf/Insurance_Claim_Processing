import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Claim {
  @PrimaryGeneratedColumn()
  readonly claimId!: number;

  @Column({ type: "varchar", length: 50 })
  readonly policyId!: string;

  @Column({ type: "varchar", length: 50, unique: true })
  readonly claimNumber!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  readonly policyHolderId!: User;

  @Column({
    type: "varchar",
    length: 20,
    default: "pending",
  })
  readonly status!: string;

  @Column({ type: "text", nullable: true })
  readonly treatmentDetails!: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  readonly amountRequested!: number;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
