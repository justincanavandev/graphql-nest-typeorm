import { Module } from '@nestjs/common';
import { UserResolver } from 'src/graphql/resolvers/UserResolver';
import { UserService } from './UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSettings } from 'src/graphql/models/UserSettings';
import { UserSettingsService } from './UserSettingService';
import { UserSettingsResolver } from 'src/graphql/resolvers/UserSettingsResolver';
// import { UserSettings } from 'src/graphql/models/UserSettings';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSettings])],
  providers: [
    UserResolver,
    UserSettingsResolver,
    UserService,
    UserSettingsService,
  ],
})
export class UsersModule {}
