import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const envDevelopmentName = 'development';
const env = process.env.NODE_ENV || envDevelopmentName;
const configs = {
  base: {
    ENV: env,
    DEV: env === envDevelopmentName,
    // Event Store
    EVENT_STORE_SETTINGS: {
      protocol: process.env.EVENT_STORE_PROTOCOL || 'http',
      hostname: process.env.EVENT_STORE_HOSTNAME || '0.0.0.0',
      tcpPort: process.env.EVENT_STORE_TCP_PORT ||  1113,
      httpPort: process.env.EVENT_STORE_HTTP_PORT ||  2113,
      credentials: {
        username: process.env.EVENT_STORE_CREDENTIALS_USERNAME ||  'admin',
        password: process.env.EVENT_STORE_CREDENTIALS_PASSWORD ||  'changeit',
      },
      poolOptions: {
        min: process.env.EVENT_STORE_POOLOPTIONS_MIN || 1,
        max: process.env.EVENT_STORE_POOLOPTIONS_MAX || 10,
      },
    },
  },
  development: {},
  production: {
    PORT: process.env.APP_PORT || 7071,
  },
  test: {
    PORT: 7072,
  },
};

const config = {...configs.base, ...configs[env]};

export {config};
