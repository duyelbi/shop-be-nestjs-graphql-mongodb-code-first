import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { PubSub } from 'graphql-subscriptions';

import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { CatsGuard } from './cats.guard';
import { Cat } from '../graphql.schema';

const pubSub = new PubSub();

@Resolver('Cat')
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query('cats')
  @UseGuards(CatsGuard)
  async getCats() {
    return this.catsService.findAll();
  }

  @Query('cat')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<Cat | undefined> {
    return this.catsService.findOneById(id);
  }

  @Mutation('createCat')
  async create(@Args('createCatInput') args: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catsService.create(args);
    pubSub.publish('catCreated', { catCreated: createdCat });
    return createdCat;
  }

  @Subscription('catCreated')
  catCreated() {
    return pubSub.asyncIterator('catCreated');
  }
}
