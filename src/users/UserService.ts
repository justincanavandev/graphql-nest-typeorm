import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { Repository } from 'typeorm';
import { UserCreateInput } from './dto/userCreateInput';
// import { UserSettings } from 'src/graphql/models/UserSettings';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers() {
    return await this.usersRepository.find({ relations: ['settings'] });
  }

  async getUserById(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['settings'],
    });
  }

  async createUser(user: UserCreateInput) {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async updateUser(user: UserCreateInput, id: number) {
    await this.usersRepository.update(id, user);

    return this.usersRepository.findOne({ where: { id } });
  }

  async deleteUser(id: number) {
    const deletedUser = await this.usersRepository.findOneBy({
      id,
    });
    await this.usersRepository.delete(id);

    return deletedUser;
  }

  // @ResolveField((returns) => UserSettings, { name: 'settings', nullable: true })
  // getUserSettings(@Parent() user: User) {
  //   return this.userSettingService.getUserSettingById(user.id);
  // }
}
