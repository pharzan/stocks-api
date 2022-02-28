
const trades=async (fastify, opts, next) => {

    fastify.post('/',async (req, res) => {
        return res.status(200).send({
            response: true,
            message: 'post'        
        })
    })
    
    fastify.get('/', async(req, res) => {
        return res.status(200).send({
            response: true,
            message: 'DELETE'        
        })
    })

    fastify.get('/users/:userId', async(req, res) => {

        const { userId } = req.params;

        return res.status(200).send({
            response: true,
            message: 'userID '+userId        
        })
    })


    next();
}



export { trades };
