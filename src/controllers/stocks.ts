import { FastifyRequest } from 'fastify';
import Knex from 'knex';
import { app } from '../app'

declare module 'fastify' {
    export interface FastifyInstance {
        knex: Knex;
    }
}

type StocksRequest = FastifyRequest<{
    Params: {
        symbol: string;
    }
    Querystring: {
        start: string;
        end: string;
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

export const getSymbolPrice = async (req: StocksRequest, res) => {

    const { symbol } = req.params;
    const { start, end } = req.query;
    const result = await app.knex<Trade>('trades')
        .select('symbol')
        .max('price as highest')
        .min('price as lowest')
        .where(function (q) {
            if (start) q.where('timestamp', '>=', start);
            if (end) q.where('timestamp', '<=', end);
        }).groupBy('symbol').first();

    if (!result) return res.status(404).send({
        response: false,
        message: 'There are no trades in the given date range.'
    })

    return res.status(200).send({
        response: true,
        message: `${symbol} price between ${start} and ${end}`,
        result
    })
}

export const getStats = async (req: StocksRequest, res) => {

    const { start, end } = req.query;
    const trades = await app.knex<Trade>('trades')
        .select('price', 'symbol', 'timestamp')
        .where(function (q) {
            if (start) q.where('timestamp', '>=', start);
            if (end) q.where('timestamp', '<=', end);
        });
    const results = {};

    trades.forEach(trade => {
        if (results[trade.symbol]) results[trade.symbol].price.push(trade.price);
        else results[trade.symbol] = { price: [trade.price] };
    });

    Object.keys(results).forEach(symbol => {
        const trade = results[symbol];

        trade.highest = Math.max(...trade.price);
        trade.lowest = Math.min(...trade.price);
        let fluctuation = 0;
        if (trade.price.length > 2) {
            for (let i = 0; i < trade.price.length; i++) {
                fluctuation += (trade.price[i] != trade.price[i - 1]) ? 1 : 0
            }
        }
        trade.fluctuation = fluctuation;


    })

    return res.status(200).send({
        response: true,
        message: `price between ${start} and ${end}`,
        result: { ...results }
    })
}
