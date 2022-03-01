import * as dotenv from 'dotenv';

import pino from 'pino';
import fastify from 'fastify';
import knex from './helpers/knex';

import { indexRouter } from './routes';
import { trades } from './routes/trades';
import { stocks } from './routes/stocks';
import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

dotenv.config();

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const port:number = Number(process.env.PORT) || 3001;
const host:string = process.env.HOST || '127.0.0.1'

const app: FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
> = fastify({ logger });

app.register(knex, {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
})

app.register(indexRouter, { prefix: '/' });
app.register(trades, { prefix: '/trades' });
app.register(stocks, { prefix: '/stocks' });

app.register(require('fastify-cors'), {})

  
  
const start = async (): Promise<void> => {
    try {
        await app.listen(port, host);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}
start()

export { app };