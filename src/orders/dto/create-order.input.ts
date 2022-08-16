import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  readonly address: string;

  @Field()
  readonly price: number;

  @Field()
  readonly item: string;
}
