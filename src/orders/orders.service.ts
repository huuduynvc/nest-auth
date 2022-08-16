import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderInput } from './dto/create-order.input';
import { Order, OrderDocument } from './orders.schema';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderStatus } from 'src/enums/order.enum';
import { filter } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderInput);
    const order = await createdOrder.save();
    return order;
  }

  async findOrdersPending() {
    return await this.orderModel.find({ is_payment: OrderStatus.PENDING });
  }

  async findOrdersByAddress(address) {
    return await this.orderModel.find({ address });
  }

  async findOne(id: string) {
    return await this.orderModel.findById(id);
  }

  async update(updateOrderInput: UpdateOrderInput) {
    const result = await this.orderModel.updateOne(
      { _id: updateOrderInput.id },
      updateOrderInput,
    );
    return await this.findOne(updateOrderInput.id);
  }

  async updateMany(filter, update) {
    return await this.orderModel.updateMany(filter, update);
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
