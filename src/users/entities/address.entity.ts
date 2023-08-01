import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Address {
  constructor(address: Partial<Address>) {
    Object.assign(this, address);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  suite: string;

  @Column()
  city: string;

  @Column({ nullable: true, type: 'longtext' })
  zipcode: string;

  @OneToOne(() => User, { cascade: true })
  user: User;
}
