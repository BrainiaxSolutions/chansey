import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("shelters")
export class Shelter {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column({ length: 45, nullable: false })
  name: string;

  @Column({ length: 45, nullable: false, unique: true })
  email: string;

  @Column({ length: 18, nullable: false, unique: true })
  cnpj: string;

  @Column({ length: 2, nullable: true })
  state: string;

  @Column({ length: 29, nullable: true })
  city: string;

  @Column({ length: 9, nullable: false })
  zipCode: string;

  @Column({ length: 45, nullable: false })
  address: string;

  @Column({ length: 4, nullable: false })
  addressNumber: string;

  @Column({ length: 30, nullable: false })
  complement: string;

  @Column("json")
  location: { type: string; coordinates: [number, number] };

  @Column({ length: 14, nullable: false })
  phone: string;

  @Column({ default: false, nullable: true })
  isActive: boolean;

  @Column({ nullable: false })
  terms: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
