import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderResolver } from './orders.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './orders.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrderResolver, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
