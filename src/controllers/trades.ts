import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import Knex from 'knex';
import { app } from '../app'

declare module 'fastify' {
    export interface FastifyInstance {
        knex: Knex;
    }
}

type TradeRequest = FastifyRequest<{
    Body:
    {
        id: number;
        type: string;
        user: { id: number; name: string; };
        symbol: string;
        shares: number;
        price: number;
        timestamp: string;
    },
    Params: {
        userId: string;
    }
}>

interface Trade {
    id: number;
    type: string;
    user: object;
    symbol: string;
    shares: number;
    price: number;
    timestamp: string;
}

export const createTrade = async (req: TradeRequest, res: FastifyReply) => {
    const { id, type, user, symbol, shares, price, timestamp } = req.body;

    try {
        await app.knex<Trade>('trades').insert({
            id,
            type,
            user,
            symbol,
            shares,
            price,
            timestamp
        });
    }
    catch (e) {
        return res.status(400).send({
            response: false,
            message: 'Error inserting trade.'
        })
    }

    return res.status(201).send({
        response: true,
        message: 'trade created.'
    })
}

export const getAllTrades = async (req: TradeRequest, res: FastifyReply) => {
    const result = await app.knex<Trade>('trades')
        .select('*')
        .from('trades')
        .orderBy('id', 'asc');

    return res.status(200).send({
        response: true,
        message: 'all trades',
        result
    })
}

export const getTradeByUserId = async (req: TradeRequest, res: FastifyReply) => {
    const { userId } = req.params;

    const result = await app.knex<Trade>('trades').whereRaw(`"user"->>'id' = '${userId}'`);

    if (!result.length) res.status(404).send({
        response: false,
        message: 'No trades found for user.'
    })

    return res.status(200).send({
        response: true,
        message: 'trades for user ' + userId,
        result
    })
}