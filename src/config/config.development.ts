const developmentConfig = {
  ENVIROMENT: 'development',
  SERVICE_URL: {
    USER: 'http://user-service.kubera.dev',
    CRYPTO_META: 'http://crypto-meta-service.kubera.dev',
    ORDER: 'http://order-service.kubera.dev',
    PORTFOLIO: 'http://order-service.kubera.dev',
  },
  WEBSOCKET: {
    CRYPTO_META: 'ws://crypto-meta-service.kubera.dev',
  },
};

export default developmentConfig;
