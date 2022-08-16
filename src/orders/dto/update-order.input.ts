import { InputType, Field, ID } from '@nestjs/graphql';
import { OrderStatus } from 'src/enums/order.enum';

@InputType()
export class UpdateOrderInput {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly address: string;

  @Field()
  readonly price: number;

  @Field()
  readonly item: string;

  @Field({ defaultValue: OrderStatus.PENDING })
  readonly is_payment: string;
}
