import { Module } from '@nestjs/common';
import { UserResolver } from 'src/graphql/resolvers/UserResolver';
import { UserService } from './services/UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/entities/User';
import { UserSettings } from 'src/graphql/entities/UserSettings';
import { UserSettingsService } from './services/UserSettingService';
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
