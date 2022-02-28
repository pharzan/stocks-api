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
        try{
        await fastify.knex('trades').delete();}
        catch(e){
            return res.stats(400).send({
                response: false,
                message: 'error deleting trades'
            })
        }
        return res.status(200).send({
            response: true,
            message: 'all records were deleted.'        
        })
    })

    next();
}



export { indexRouter };
