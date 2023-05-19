import { ObjectType } from '@nestjs/graphql';

import { RelayTypes } from '../../common/relay/relay.types';
import { User } from '../entities/user.entity';

@ObjectType()
export class ListUsersResponse extends RelayTypes<User>(User) {}
