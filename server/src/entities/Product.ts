import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PremiumRate } from "../common/enums/premium-rate.enum";

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
    nullable: true, // Optional field
  })
  readonly description!: string;

  @Column({
    type: "simple-array", // Stores an array of strings
    nullable: true,
  })
  readonly keyBenefits!: string[];

  @Column()
  readonly createdAt!: Date;

  @Column()
  readonly updatedAt!: Date;
}
