import knex from 'knex';
import fp from 'fastify-plugin';

export default fp(async (fastify, opts, next) => {
    try {

        const db = knex(opts);
        fastify.decorate('knex', db);
        next();

    } catch (e) {
        next(e)
    }
})