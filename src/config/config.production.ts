const productionConfig = {
  ENVIROMENT: 'production',
  SERVICE_URL: {
    USER: 'http://prod-user-service.coinomatic.in',
    CRYPTO_META: 'http://prod-crypto-meta-service.coinomatic.in',
    ORDER: 'http://prod-order-service.coinomatic.in',
    PORTFOLIO: 'http://prod-order-service.coinomatic.in',
  },
  WEBSOCKET: {
    CRYPTO_META: 'ws://prod-crypto-meta-service.coinomatic.in',
  },
};

export default productionConfig;
