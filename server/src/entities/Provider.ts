import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  readonly providerId!: number;

  @Column({ type: "varchar", length: 100 })
  readonly name!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  readonly picture?: string; // Nullable for providers without profile images

  @Column({ type: "simple-json", nullable: true })
  readonly location?: {
    address: string;
    city: string;
    state?: string;
    zipCode?: string;
  };

  @Column({ type: "varchar", length: 20 })
  readonly contactNumber!: string;

  @Column({
    type: "simple-array",
    nullable: true,
    default: "",
  })
  readonly specialities!: string[];

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0 })
  readonly rating!: number; // Stores values like 4.75 (precision 3, scale 2)

  @Column({ type: "int", default: 0 })
  readonly reviewCount!: number; // Added to track number of ratings

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
