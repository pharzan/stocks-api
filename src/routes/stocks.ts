const stocks=async (fastify, opts, next) => {

    fastify.get('/:symbol/price',async (req, res) => {

        const { symbol } = req.params;
        const { start, end } = req.query;
        let results = [];
        try{
            results = await fastify.knex('trades')
            .select('symbol')
            .max('price as highest')
            .min('price as lowest')
            .where('symbol', symbol)
            .where(function(c){
                if(start) c.where('timestamp', '>=', start);
                if(end) c.where('timestamp', '<=', end);
            }).first().groupBy('symbol');

        }catch(e){
            return res.status(400).send({
                response: false,
                message: 'error getting stock price'
            })
        }
        return res.status(200).send({
            response: true,
            message: `{symbol: ${symbol}, start: ${start}, end: ${end}}`,
            results
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
