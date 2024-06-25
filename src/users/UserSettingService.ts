import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSettings } from 'src/graphql/models/UserSettings';
import { Repository } from 'typeorm';
import { UserSettingsInput } from './dto/userCreateInput';
import { User } from 'src/graphql/models/User';

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
}
