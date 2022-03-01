import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import Knex from 'knex';
import { createTrade, getAllTrades, getTradeByUserId } from '../controllers/trades';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { Static, Type } from '@sinclair/typebox'

const TradeInterface =  Type.Object({
        id: Type.Number(),
        symbol: Type.String(),
        shares: Type.Number(),
        price: Type.Number(),
        timestamp: Type.String(),
        user: Type.Object({
            id: Type.Number(),
            name: Type.String(),
        })
    })

const TradeResponse = Type.Object({
    response: Type.Boolean(),
    message: Type.String(),
    result: Type.Optional(Type.Array(TradeInterface))
});

const TradeRequest = Type.Object({
    type: Type.String(TradeInterface),
})

const GenericResponse = Type.Object({
    response: Type.Boolean(),
    message: Type.String()
})

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
        handler: createTrade,
        schema: {
            body: TradeRequest,
            response: {
                201: GenericResponse,
                400: GenericResponse
            },
        },

    });

    fastify.route({
        method: 'GET',
        url: '/',
        handler: getAllTrades,
        schema: {
            response: {
                200: TradeResponse,
                404: GenericResponse
            },
        },
    });

    fastify.route({
        method: 'GET',
        url: '/users/:userId',
        handler: getTradeByUserId,
        schema: {
            response: {
                200: TradeResponse,
                404: GenericResponse
            },
        },
    });

    next();
}
export { trades };
