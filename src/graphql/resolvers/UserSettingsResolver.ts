import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserSettings } from '../entities/UserSettings';
// import { UserSettingsCreate } from 'src/users/dto/userSettingsCreate.input';
import { UserSettingsService } from 'src/users/services/UserSettingService';
import { UserSettingsInput } from 'src/graphql/dto/userCreateInput';
import { UserSettingsUpdate } from '../dto/userSettingsCreateInput';

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

  @Query(() => UserSettings)
  async getUserSettings(@Args('userId') userId: number) {
    const userSettings = await this.userSettingsService.getUserSettings(userId);

    return userSettings;
  }

  @Mutation(() => UserSettings)
  async updateUserSettings(
    @Args('settingsId') settingsId: number,
    @Args('userSettings') userSettings: UserSettingsUpdate,
  ) {
    return this.userSettingsService.updateUserSettings(
      settingsId,
      userSettings,
    );
  }

  @Mutation(() => UserSettings)
  async deleteUserSettings(@Args('settingsId') settingsId: number) {
    return this.userSettingsService.deleteUserSettings(settingsId);
  }
}
