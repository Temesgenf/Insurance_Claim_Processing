import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PremiumRate } from "../common/enums/premium-rate.enum";
import { Provider } from "./Provider";

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
  @Index() // Improves lookup performance
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
    nullable: true, // Optional field
  })
  readonly description!: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: "providerId" })
  readonly provider!: Provider;

  @Column({
    type: "simple-array", // Stores an array of strings
    nullable: true,
  })
  readonly keyBenefits!: string[];

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
}
