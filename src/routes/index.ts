import { health, eraseAllTrades } from '../controllers/indexRouter'
import { stocks } from './stocks'
import { trades } from './trades'

const indexRouter=async (fastify, opts, next) => {

    fastify.get('/health', health)
    
    fastify.delete('/erase', eraseAllTrades)

    next();
}



export { indexRouter, stocks, trades };
