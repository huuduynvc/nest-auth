import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrderService } from './orders.service';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './orders.schema';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    console.log(createOrderInput);
    return await this.orderService.create(createOrderInput);
  }

  // @Query(() => [Order], { name: 'order' })
  // findAll() {
  //   return this.orderService.findAll();
  // }

  @Query(() => [Order])
  async findOrdersByAddress(@Args('address') address: string) {
    return this.orderService.findOrdersByAddress(address);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ) {
    return await this.orderService.update(updateOrderInput);
  }

  // @Mutation(() => OrderItem)
  // removeOrderItem(@Args('id', { type: () => Int }) id: number) {
  //   return this.orderItemsService.remove(id);
  // }
}
