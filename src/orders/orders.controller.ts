import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

export interface OrderReceipt {
  orderId: string;
  orderRef: string;
}

export interface OrderRequest {
  type: string;
  customer: string;
  orderItems: OrderItemRequest[];
}

export interface OrderItemRequest {
  productNumber: string;
  numberOfItems: number;
  unitPrice: number;
}

@Controller('orders')
export class OrdersController {
  @Inject(OrdersService)
  private readonly orderService: OrdersService;

  @Post()
  async acceptOrder(@Body() orderRequest: OrderRequest): Promise<OrderReceipt> {
    const order = await this.orderService.createOrder(orderRequest);
    return {
      orderId: order.id,
      orderRef: `/orders/${order.id}`,
    };
  }
}
