import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private entityManager: EntityManager,
    private usersService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.entityManager.create(Post, createPostDto);
    let userId = createPostDto.userId;
    let user = await this.usersService.findOne(userId);
    post.user = user;
    return this.entityManager.save(post);
  }

  findAll() {
    return this.entityManager.find(Post); // entityManager
    // return this.postRepo.find({}); // repo
  }

  findOne(id: number) {
    return this.postRepo.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    // repo api
    let newPost = await this.postRepo.findOneBy({ id });
    if (!newPost) {
      throw new Error('Post not found.');
    }
    newPost.title = updatePostDto.title;
    newPost.content = updatePostDto.content;
    return this.postRepo.save(newPost);
    // antity manager
  }

  async remove(id: number) {
    return await this.entityManager.delete(Post, id);
  }
}
