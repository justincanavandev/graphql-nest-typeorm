import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSettings } from 'src/graphql/entities/UserSettings';
import { Repository } from 'typeorm';
import { UserSettingsInput } from '../../graphql/dto/userCreateInput';
import { User } from 'src/graphql/entities/User';
import { UserSettingsUpdate } from 'src/graphql/dto/userSettingsCreateInput';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSettings)
    private userSettingsRepository: Repository<UserSettings>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUserSettings(userSettings: UserSettingsInput) {
    const findUser = await this.userRepository.findOneBy({
      id: userSettings.userId,
    });

    if (!findUser) throw new Error('User not found');

    const newUserSettings = this.userSettingsRepository.create(userSettings);

    const savedSettings =
      await this.userSettingsRepository.save(newUserSettings);

    findUser.settings = savedSettings;
    await this.userRepository.save(findUser);
    return savedSettings;
  }

  async getUserSettings(settingsId: number) {
    const settings = await this.userSettingsRepository.findOneBy({
      id: settingsId,
    });
    return settings;
  }

  async updateUserSettings(
    settingsId: number,
    userSettings: UserSettingsUpdate,
  ) {
    await this.userSettingsRepository.update(settingsId, userSettings);

    return this.userSettingsRepository.findOne({ where: { id: settingsId } });
  }

  async deleteUserSettings(id: number) {
    const deletedSettings = await this.userSettingsRepository.findOneBy({
      id,
    });
    await this.userSettingsRepository.delete(deletedSettings);

    return deletedSettings;
  }
}
