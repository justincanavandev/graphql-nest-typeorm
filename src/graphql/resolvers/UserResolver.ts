import {
  Args,
  Int,
  Mutation,
  Query,
  // ResolveField,
  Resolver,
  // Parent,
} from '@nestjs/graphql';
import { User } from '../entities/User';
import { UserService } from 'src/users/services/UserService';
import { Inject } from '@nestjs/common';
import { UserCreateInput } from 'src/graphql/dto/userCreateInput';
// import { UserSettingsService } from 'src/users/services/UserSettingService';
// import { UserSettings } from '../models/UserSettings';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(UserService) private userService: UserService,
    // private userSettingsService: UserSettingsService,
  ) {}

  @Query(() => [User])
  getUsers() {
    return this.userService.getUsers();
  }

  @Query(() => User)
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User)
  createUser(@Args('user') user: UserCreateInput) {
    return this.userService.createUser(user);
  }

  @Mutation(() => User)
  updateUser(@Args('id') id: number, @Args('user') user: UserCreateInput) {
    return this.userService.updateUser(id, user);
  }

  @Mutation(() => User)
  deleteUser(@Args('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
