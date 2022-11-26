import * as uuid from 'short-uuid';
import { OrderItemRequest, OrderRequest } from './orders.controller';

export class Order {
  private readonly _id: string;
  private readonly _type: string;
  private readonly _customer: string;
  private readonly _items: OrderItem[];

  constructor(orderReq: OrderRequest) {
    this._id = `O-${uuid().new()}`;
    this._type = orderReq.type;
    this._customer = orderReq.customer;
    this._items = orderReq.orderItems.map(
      (i, idx) => new OrderItem(i, this._id, idx++),
    );
  }

  get id(): string {
    return this._id;
  }

  get type(): string {
    return this._type;
  }

  get customer(): string {
    return this._customer;
  }

  get items(): OrderItem[] {
    return this._items;
  }
}

export class OrderItem {
  private readonly _id: string;
  private _productNumber: string;
  private _numberOfItems: number;
  private _unitPrice: number;

  constructor(itemRequest: OrderItemRequest, orderId: string, itemId: number) {
    this._id = `${orderId}:I-${itemId}`;
  }

  get id(): string {
    return this._id;
  }

  get productNumber(): string {
    return this._productNumber;
  }

  get numberOfItems(): number {
    return this._numberOfItems;
  }

  get unitPrice(): number {
    return this._unitPrice;
  }
}
