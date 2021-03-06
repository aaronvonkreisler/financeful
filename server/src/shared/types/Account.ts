import { Field, ObjectType, ID, Int } from 'type-graphql';
import { User } from './User';

export type BalanceUpdateInfo =
  | { increment: number; decrement?: never }
  | {
      decrement: number;
      increment?: never;
    };

@ObjectType()
export class Account {
  @Field(() => ID)
  id: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  accountName?: string;

  @Field(() => String, { nullable: true })
  accountType?: String;

  @Field(() => Int, { nullable: true })
  balance?: number;

  @Field(() => String, { nullable: true })
  bankName?: string | null;

  @Field(() => Boolean, { nullable: true })
  isAsset?: boolean;

  @Field(() => Boolean, { nullable: true })
  isLiability?: Boolean;

  @Field(() => Boolean, { nullable: true })
  isInactive?: boolean;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
