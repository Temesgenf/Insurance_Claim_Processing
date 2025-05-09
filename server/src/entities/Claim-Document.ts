import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Claim } from "./Claim";

@Entity()
export class ClaimDocument {
  @PrimaryGeneratedColumn()
  readonly claimDocumentId!: number;

  @ManyToOne(() => Claim)
  @JoinColumn({ name: "claimId" })
  readonly claim!: Claim;

  @Column()
  readonly claimId!: number;

  @Column({ type: "varchar", length: 255 })
  readonly fileUrl!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  readonly originalFileName?: string;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
