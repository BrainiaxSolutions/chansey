import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'shelters' })
export class Shelter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'char',
    length: '18',
    unique: true,
    nullable: false,
  })
  cnpj: string;

  @Column({
    type: 'char',
    length: '2',
    nullable: true,
  })
  state: string;

  @Column({
    type: 'varchar',
    length: 29,
    nullable: true,
  })
  city: string;

  @Column({
    type: 'char',
    length: '9',
    nullable: false,
  })
  zipCode: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 4,
    nullable: false,
  })
  addressNumber: string;

  @Column({
    type: 'char',
    length: 14,
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: true,
  })
  isActive: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  terms: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  updatedAt: Date;
}
