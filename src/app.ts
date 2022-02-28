import dotenv from  'dotenv';
import Boom from '@hapi/boom';
import fastify from 'fastify';

import { indexRouter } from './routes';
import { trades } from './routes/trades';
import { stocks } from './routes/stocks';

import knex from './helpers/knex';
import pino from 'pino';
dotenv.config();

const logger = pino({});


const port = process.env.PORT || 3002;
console.log(port)
// view engine setup

const app = fastify({ logger});

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

//app.use('/trades', trades);
//app.use('/erase', erase);
//app.use('/stocks', stocks);

const server = async () => {
    try {
      await app.listen(port)
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
  server()
  


// export { app };
