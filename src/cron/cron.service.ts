import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OrderStatus } from 'src/enums/order.enum';
import { OrderService } from 'src/orders/orders.service';

@Injectable()
export class CronService {
  constructor(private orderService: OrderService) {}
  @Cron('*/10 * * * * *')
  async addOrderEvery60Seconds() {
    const createOrder = {
      address: (Math.random() + 1).toString(36).substring(7),
      item: (Math.random() + 1).toString(36).substring(7),
      price: 100,
    };
    console.log('order created: ', createOrder);
    await this.orderService.create(createOrder);
  }
  @Cron('0 */1 * * * *')
  async updateOrderEvery300Seconds() {
    const orderPending = await this.orderService.findOrdersPending();
    const orderPendingIds = orderPending.map((x) => x._id);
    await this.orderService.updateMany(
      { _id: { $in: orderPendingIds } },
      { is_payment: OrderStatus.FAILED },
    );
    console.log('updated order pending');
  }
}
