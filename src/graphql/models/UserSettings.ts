import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  OneToOne,
  PrimaryColumn,
  JoinColumn,
  // JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'userSettings' })
@ObjectType()
export class UserSettings {
  @PrimaryColumn()
  @Field(() => Int)
  userId: number;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveEmails: boolean;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  // @Field({ nullable: true })
  // @JoinColumn({ name: 'settingsId' })
  user: User;
}
