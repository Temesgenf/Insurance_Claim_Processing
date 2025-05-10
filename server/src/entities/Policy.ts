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

@Entity("policies")
@Unique(["policyNumber"]) // Ensures policy numbers are unique
export class Policy {
  @PrimaryGeneratedColumn()
  readonly policyId!: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "productId" })
  readonly productId!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  readonly policyHolderId!: number; // Using relation instead of policyHolderId

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
  })
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

  @Column()
  readonly createdAt!: Date;

  @Column()
  readonly updatedAt!: Date;

  // Optional: For tracking when policy became active
  @Column({
    type: "timestamp",
    nullable: true,
  })
  readonly activatedAt!: Date;
}
