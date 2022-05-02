import developmentConfig from './config.development';
import productionConfig from './config.production';

let config;

// Choose ENVIROMENT
const ENVIROMENT = productionConfig.ENVIROMENT;

export interface IConfig {
  SERVICE_URL: {
    USER: string;
    CRYPTO_META: string;
    ORDER: string;
    PORTFOLIO: string;
  };
  WEBSOCKET: {
    CRYPTO_META: string;
  };
}

if (ENVIROMENT === productionConfig.ENVIROMENT) {
  config = productionConfig;
} else {
  config = developmentConfig;
}

export default <IConfig>config;
