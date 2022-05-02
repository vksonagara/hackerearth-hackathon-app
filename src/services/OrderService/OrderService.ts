import { fetcher } from '@utils';
import config from '@config';

export default class OrderService {
  public static async createOrder(order: CreateOrder): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.ORDER}/api/orders`,
      method: 'POST',
      body: order,
    });
  }

  public static async getOrder(orderId: string): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.ORDER}/api/orders/${orderId}`,
      method: 'GET',
    });
  }

  public static async getPortfolioOrders(
    portfolioOrders: GetPortfolioOrders,
  ): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.ORDER}/api/orders/portfolio-orders`,
      method: 'GET',
      params: portfolioOrders,
    });
  }

  public static async cancelOrder(orderId: string): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.ORDER}/api/orders/cancel`,
      method: 'PUT',
      body: {
        orderId,
      },
    });
  }
}

export interface CreateOrder {
  portfolioId: string;
  orderType: string;
  orderSide: string;
  baseSymbol: string;
  quoteSymbol: string;
  quantity: number;
  limitPrice?: number;
}

export interface GetPortfolioOrders {
  portfolioId: string;
  filter: string;
  page: number;
  size: number;
}
