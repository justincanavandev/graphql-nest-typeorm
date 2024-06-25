import { InputType, Field } from '@nestjs/graphql';
// import { UserSettings } from 'src/graphql/models/UserSettings';

@InputType()
export class UserCreateInput {
  @Field()
  name: string;

  @Field()
  email: string;
}

@InputType()
export class UserSettingsInput {
  @Field()
  userId: number;

  @Field()
  receiveNotifications: boolean;

  @Field()
  receiveEmails: boolean;
}
