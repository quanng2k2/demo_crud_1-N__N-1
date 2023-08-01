import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterUpdate,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Address } from './address.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class User {
  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: 'longtext' })
  fullName: string;

  @AfterUpdate()
  logAfterUpdate() {
    console.log('afterUpdating...');
  }

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];
}
