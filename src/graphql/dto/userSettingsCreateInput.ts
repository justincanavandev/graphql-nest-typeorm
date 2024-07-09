import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserSettingsCreate {
  @Field(() => Int)
  settingsId: number;

  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Field({ defaultValue: false })
  receiveEmails: boolean;
}

@InputType()
export class UserSettingsUpdate {
  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Field({ defaultValue: false })
  receiveEmails: boolean;
}
