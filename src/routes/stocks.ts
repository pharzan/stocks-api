const stocks=async (fastify, opts, next) => {

    fastify.get('/:symbol/price',async (req, res) => {

        const { symbol } = req.params;
        const { start, end } = req.query;

        return res.status(200).send({
            response: true,
            message: `{symbol: ${symbol}, start: ${start}, end: ${end}}`        
        })
    })

    fastify.get('/stats',async (req, res) => {

        const { start, end } = req.query;

        return res.status(200).send({
            response: true,
            message: 'everything is healthy'        
        })
    })
    
    

    next();
}



export { stocks };
