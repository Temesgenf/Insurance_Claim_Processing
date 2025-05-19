import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly userId!: number;

  @Column()
  readonly username!: string;

  @Column()
  readonly fullName!: string;

  @Column({ unique: true })
  readonly email!: string;

  @Column()
  readonly hashedPassword!: string;

  @Column()
  readonly dob!: Date;

  @Column()
  readonly phoneNumber!: string;

  @Column()
  readonly age!: number;

  @Column({ default: false })
  readonly isAdmin!: boolean;

  // New fields for profile picture
  @Column({ type: "longblob", nullable: true })
  readonly profilePicture!: Buffer;

  @Column({ nullable: true })
  readonly profilePictureType!: string;

  @Column()
  readonly createdAt!: Date;

  @Column()
  readonly updatedAt!: Date;
}
