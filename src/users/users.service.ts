import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
    private entityManager: EntityManager,
  ) {}

  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    // // repo api
    // let user = this.userRepo.create(createUserDto);
    // return this.userRepo.save(user);

    // entityManager
    const user = this.entityManager.create(User, createUserDto);
    return this.entityManager.save(user);
  }

  findAll() {
    return this.entityManager.find(User, { relations: { address: true } }); // entityManager
    // return this.userRepo.find({});  // repo
  }

  findOne(id: number) {
    // return this.entityManager.findOne(User, { id });
    return this.userRepo.findOne({
      where: { id },
      relations: { address: true, posts: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // persist data
    // repo api
    // let find = await this.usersRepo.findOneBy({ id });

    // let user = new User({
    //   ...find,
    //   ...updateUserDto,
    // });

    // return this.usersRepo.save(user);

    // entity manager api
    let find = await this.entityManager.findOne(User, {
      where: { id },
      relations: { address: true },
    });
    let address = new Address(updateUserDto.address);
    // console.log()
    let user = new User({
      ...find,
      ...updateUserDto,
      address: {
        ...find.address,
        ...address,
      },
    });
    return this.entityManager.save(user);
  }

  async remove(id: number) {
    // repo api
    const find = await this.entityManager.findOne(User, {
      where: { id },
      relations: { address: true },
    });
    await this.userRepo.remove(find);
    await this.removeAddress(find.address.id);
  }

  async removeAddress(id: number) {
    const address = await this.entityManager.findOneBy(Address, { id });
    return this.entityManager.remove(address);
  }
}
