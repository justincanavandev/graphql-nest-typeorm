import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserSettings } from './UserSettings';

@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @OneToOne(() => UserSettings)
  @JoinColumn({ name: 'settingsUserId' })
  @Field({ nullable: true })
  settings?: UserSettings;
}
