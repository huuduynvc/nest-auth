import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderStatus } from 'src/enums/order.enum';

export type OrderDocument = Order & Document;

@ObjectType()
@Schema()
export class Order {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop()
  address: string;

  @Field()
  @Prop()
  item: string;

  @Field()
  @Prop()
  price: string;

  @Field({ nullable: true, defaultValue: OrderStatus.PENDING })
  @Prop({ default: OrderStatus.PENDING })
  is_payment: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
