import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import Knex from 'knex';
import { createTrade, getAllTrades, getTradeByUserId } from '../controllers/trades';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { create } from "domain";

declare module 'fastify' {
    export interface FastifyInstance {
        knex: Knex;
    }
}

const trades = async (
    fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
    opts: { prefix: string },
    next: (err?: Error) => void) => {

    fastify.route({
        method: 'POST',
        url: '/',
        handler: createTrade
    });

    fastify.route({
        method: 'GET',
        url: '/',
        handler: getAllTrades
    });

    fastify.route({
        method: 'GET',
        url: '/users/:userId',
        handler: getTradeByUserId
    });

    next();
}
export { trades };
