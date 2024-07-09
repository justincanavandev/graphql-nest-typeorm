import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  // JoinColumn,
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

  // The side that has the JoinColumn decorator will contain a relationId and foreign keys to target the related table

  @OneToOne(() => UserSettings, (userSettings) => userSettings.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field({ nullable: true })
  settings?: UserSettings;
}
