import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserSettings } from '../models/UserSettings';
// import { UserSettingsCreate } from 'src/users/dto/userSettingsCreate.input';
import { UserSettingsService } from 'src/users/UserSettingService';
import { UserSettingsInput } from 'src/users/dto/userCreateInput';

@Resolver()
export class UserSettingsResolver {
  constructor(private userSettingsService: UserSettingsService) {}
  @Mutation(() => UserSettings)
  async createUserSettings(
    @Args('userSettings') userSettings: UserSettingsInput,
  ) {
    const settings =
      await this.userSettingsService.createUserSettings(userSettings);

    return settings;
  }
}
