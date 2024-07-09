import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/entities/User';
import { Repository } from 'typeorm';
import { UserCreateInput } from '../../graphql/dto/userCreateInput';
// import { UserSettings } from 'src/graphql/entities/UserSettings';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    // @InjectRepository(UserSettings)
    // private userSettingsRepository: Repository<UserSettings>,
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

  async updateUser(id: number, user: UserCreateInput) {
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
}
