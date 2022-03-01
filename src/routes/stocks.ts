import { getSymbolPrice, getStats } from '../controllers/stocks';
import { FastifyInstance } from 'fastify';
const stocks = async (fastify: FastifyInstance, opts, next) => {

    fastify.route({
        method: 'GET',
        url: '/:symbol/price',
        handler: getSymbolPrice,


    })

    fastify.route({
        method: 'GET',
        url: '/stats',
        handler: getStats
    })

    next();
}



export { stocks };
