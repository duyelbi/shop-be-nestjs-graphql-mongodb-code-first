import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { OwnersService } from '../owners/owners.service';
import { Cat, Owner } from '../graphql.schema';

@Resolver('Cat')
export class CatOwnerResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @ResolveField()
  async owner(
    @Parent() cat: Cat & { ownerId: number },
  ): Promise<Owner | undefined> {
    return this.ownersService.findOneById(cat.ownerId);
  }
}
