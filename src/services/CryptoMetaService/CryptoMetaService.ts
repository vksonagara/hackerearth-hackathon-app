import { fetcher } from '@utils';
import config from '@config';

export default class CryptoMetaService {
  private static ws: WebSocket;
  private static async getActiveCoins(): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.CRYPTO_META}/api/coins/active-coins`,
      method: 'GET',
    });
  }

  private static async getCoinsPrices(): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.CRYPTO_META}/api/coins/prices`,
      method: 'GET',
    });
  }

  private static async getCoinsPriceChange(): Promise<any> {
    return await fetcher({
      url: `${config.SERVICE_URL.CRYPTO_META}/api/coins/24hr-price-change`,
      method: 'GET',
    });
  }

  public static async getCoins(): Promise<any> {
    console.log('Fetching coins...');
    try {
      const [activeCoins, coinsPrices, coinsPriceChange] = await Promise.all([
        CryptoMetaService.getActiveCoins(),
        CryptoMetaService.getCoinsPrices(),
        CryptoMetaService.getCoinsPriceChange(),
      ]);

      if (activeCoins.error || coinsPrices.error || coinsPriceChange.error) {
        return { data: null, error: 'Error while fetching data' };
      }

      const coins = {};

      activeCoins?.data?.coins.forEach((coin: any) => {
        const coinPairSymbol = coin.symbol + 'USDT';
        const coinPrice = coinsPrices.data.coins[coinPairSymbol];
        const coinPriceChange = coinsPriceChange.data.coins[coinPairSymbol];
        coins[coinPairSymbol] = {
          ...coin,
          close: coinPrice,
          percentChange: coinPriceChange,
          symbol: coinPairSymbol,
        };
      });

      return {
        data: {
          coins,
        },
        error: null,
      };
    } catch (err) {
      return { data: null, error: err };
    }
  }

  public static async connectWebSocket() {
    this.ws = new WebSocket(config.WEBSOCKET.CRYPTO_META);

    return this.ws;
  }

  public static disconnectWebSocket() {
    this.ws.close();
  }

  public static async subscribeCoinPriceWebSocket() {
    const webSocketData = JSON.stringify({
      event: 'subscribe',
      data: {
        stream: 'coin-price',
      },
    });
    this.ws.send(webSocketData);
  }

  public static async unsubscribeCoinPriceWebSocket() {
    console.log('Unsubscribing from coin-price stream...');
    const webSocketData = JSON.stringify({
      event: 'unsubscribe',
      data: {
        stream: 'coin-price',
      },
    });
    this.ws.send(webSocketData);
  }
}
