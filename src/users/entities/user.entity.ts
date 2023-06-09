import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId | string;
  @Prop()
  @Field(() => String, { description: 'User firstName ' })
  firstName: string;
  @Prop()
  @Field(() => String, { description: 'User lastName ' })
  lastName: string;
  @Prop()
  @Field(() => String, { description: 'User email ' })
  email: string;
  @Prop()
  password: string;
  @Prop()
  @Field(() => String, { description: 'User role' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
