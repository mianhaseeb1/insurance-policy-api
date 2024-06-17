import { config } from 'dotenv';
import * as process from 'node:process';
config();

const AppConfig = {
    APP: {
        NAME: 'INSURANCE API',
        PORT: Number(process.env.PORT || 3000),
        DEBUG: Boolean(process.env.DEBUG),
        ENVIRONMENT: process.env.NODE_ENV,
        LOG_LEVEL: Number(process.env.LOG_LEVEL),
        TOKEN_EXPIRATION: Number(process.env.TOKEN_EXPIRATION),
        ALLOWED_METHODS: process.env.ALLOWED_METHODS
            ? process.env.ALLOWED_METHODS.split(',')
            : ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    },
    DATABASE: {
        URL: process.env.DATABASE_URL,
    },
    LOG: {
        PINO_LOG_LEVEL: process.env.PINO_LOG_LEVEL,
    },
    JWT: {
        SECRET_KEY: process.env.JWT_SECRET_KEY,
        EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    },
};

export default AppConfig;
