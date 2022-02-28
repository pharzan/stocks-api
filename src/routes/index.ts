const indexRouter=async (fastify, opts, next) => {

    fastify.get('/health',async (req, res) => {
        const result = await fastify.knex('trades').select('*');

        return res.status(200).send({
            response: true,
            message: 'everything is healthy',
            result
        })
    })
    
    fastify.delete('/erase', async(req, res) => {
        return res.status(200).send({
            response: true,
            message: 'DELETE'        
        })
    })

    next();
}



export { indexRouter };
