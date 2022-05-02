import { fetcher } from '@utils';
import config from '@config';

export default class PortfolioService {
  public static async createPortfolio(
    portfolio: CreatePortfolio,
  ): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.PORTFOLIO}/api/portfolios`,
      method: 'POST',
      body: portfolio,
    });
  }

  public static async getPortfolio(portfolioId: string): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.PORTFOLIO}/api/portfolios/${portfolioId}`,
      method: 'GET',
    });
  }

  public static async getPortfolios(): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.PORTFOLIO}/api/portfolios`,
      method: 'GET',
    });
  }

  public static async updatePortfolio(
    portfolio: UpdatePortfolio,
  ): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.PORTFOLIO}/api/portfolios`,
      method: 'PUT',
      body: portfolio,
    });
  }
}

export interface CreatePortfolio {
  name: string;
  type?: string;
}

export interface UpdatePortfolio {
  name: string;
  portfolioId: string;
}
