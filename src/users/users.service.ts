import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(email: string, password: string) {
    const user = await this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async findAll() {
    const user = await this.repo.find();
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user) {
      return null;
    }
    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return this.repo.remove(user);
  }
}
