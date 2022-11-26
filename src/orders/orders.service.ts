import { Injectable } from '@nestjs/common';
import { Order } from './orders.models';
import { OrderRequest } from './orders.controller';

@Injectable()
export class OrdersService {
  async createOrder(orderRequest: OrderRequest): Promise<Order> {
    const order = new Order(orderRequest);
    await this.saveOrder(order);
    return order;
  }

  private async saveOrder(order: Order) {
    console.log(`Saving order ${JSON.stringify(order)}`);
  }
}
