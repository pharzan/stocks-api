
const trades = async (fastify, opts, next) => {

    fastify.post('/', async (req, res) => {

        const { id, symbol, type, user, price, timestamp, shares } = req.body;
        
        try {
            await fastify.knex('trades').insert({
                id,
                symbol,
                type,
                user,
                timestamp,
                shares,
                price
            })

        } catch (e) {
            console.log(e)

            return res.status(400).send({
                response: false,
                message: 'There was an error creating trade.'
            })
        }
        return res.status(201).send({
            response: true,
            message: 'Trade was created.'
        })
    })

    fastify.get('/', async (req, res) => {

        const results = await fastify.knex.select('*').from('trades').orderBy('id', 'asc');

         res.status(200).send({
            response: true,
            message: 'all trades',
            results
        })
    })

    fastify.get('/users/:userId', async (req, res) => {

        const { userId } = req.params;
        const results = await fastify.knex.select('*')
        .from('trades')
        .whereRaw(`"user"->>'id'='${userId.toString()}'`)

        if(!results.length){
            return res.status(404).send({
                response: false,
                message: 'No trades found for user.'
            })
        }

        res.status(200).send({
            response: true,
            message: 'all trades for user ' + userId,
            results
        })
    })

    next();
}



export { trades };
