import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'user_settings' })
@ObjectType()
export class UserSettings {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveEmails: boolean;

  @OneToOne(() => User, (user) => user.settings)
  @JoinColumn()
  @Field(() => User)
  user: User;
}
