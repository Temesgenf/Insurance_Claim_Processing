import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";
import { ApplicationStatus } from "../common/enums/application-status.enum";

@Entity("policy_contracts")
@Unique(["policyNumber"]) // Ensures policy numbers are unique
export class PolicyContract {
  @PrimaryGeneratedColumn()
  readonly PolicyId!: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  readonly product!: Product; // Using relation instead of productId

  @ManyToOne(() => User)
  @JoinColumn({ name: "policy_holder_id" })
  readonly policyHolder!: User; // Using relation instead of policyHolderId

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
  })
  @Index() // Improves lookup performance
  readonly policyNumber!: string;

  @Column({
    type: "date",
    nullable: false,
  })
  readonly startDate!: Date;

  @Column({
    type: "date",
    nullable: false,
  })
  readonly endDate!: Date;

  @Column({
    type: "enum",
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  readonly status!: ApplicationStatus;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  readonly createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  readonly updatedAt!: Date;

  // Optional: For tracking when policy became active
  @Column({
    type: "timestamp",
    nullable: true,
  })
  readonly activatedAt!: Date;
}
