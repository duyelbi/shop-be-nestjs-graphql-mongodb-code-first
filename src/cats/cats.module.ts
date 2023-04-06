import { Module } from '@nestjs/common';

import { CatOwnerResolver } from './cat-owner.resolver';
import { OwnersModule } from '../owners/owners.module';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';

@Module({
  imports: [OwnersModule],
  providers: [CatsService, CatsResolver, CatOwnerResolver],
})
export class CatsModule {}
