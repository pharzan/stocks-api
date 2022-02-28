import dotenv from 'dotenv';
import fastify from 'fastify';
import { indexRouter } from './routes';
import { trades } from './routes/trades';
import { stocks } from './routes/stocks';

import knex from './helpers/knex';
import pino from 'pino';

import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';


dotenv.config();

const logger = pino({});


const port: number = Number(process.env.PORT) || 3002;
const host: string = process.env.HOST || '127.0.0.1';

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger });

app.register(indexRouter, { prefix: '/' });
app.register(trades, { prefix: '/trades' });
app.register(stocks, { prefix: '/stocks' });

app.register(knex, {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
})



const server = async (): Promise<void> => {
    try {
        await app.listen(port, host)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}
server()



export { app };
