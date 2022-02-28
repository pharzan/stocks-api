import { health, eraseAllTrades } from '../controllers/indexRouter'


const indexRouter=async (fastify, opts, next) => {

    fastify.get('/health', health)
    
    fastify.delete('/erase', eraseAllTrades)

    next();
}



export { indexRouter };
