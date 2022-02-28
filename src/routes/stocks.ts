const stocks = async (fastify, opts, next) => {

    fastify.get('/:symbol/price', async (req, res) => {

        const { symbol } = req.params;
        const { start, end } = req.query;
        let results = [];
        try {

            results = await fastify.knex('trades')
                .select('symbol')
                .max('price as highest')
                .min('price as lowest')
                .where('symbol', symbol)
                .where(function (q) {
                    if (start) q.where('timestamp', '>=', start);
                    if (end) q.where('timestamp', '<=', end);
                }).first().groupBy('symbol');

        } catch (e) {
            return res.status(500).send({
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

    fastify.get('/stats', async (req, res) => {

        const { start, end } = req.query;
        let trades, results = {};
        try {
            trades = await fastify.knex('trades')
                .select('timestamp', 'price', 'symbol')
                .where(function (q) {
                    if (start) q.where('timestamp', '>=', start);
                    if (end) q.where('timestamp', '<=', end);
                });

                trades.forEach(trade => {
                    if(results[trade.symbol]) results[trade.symbol].price.push(trade.price);
                    else results[trade.symbol] = { price: [trade.price] };
                });

                Object.keys(results).forEach(symbol => {
                    const trade = results[symbol];
                    trade.highest = Math.max(...trade.price);
                    trade.lowest = Math.min(...trade.price);
                    let fluct = 0;

                    for(let i = 0; i < trade.price.length; i++){
                        fluct += trade.price[i] !=trade.price[i-1]?1:0;
                    }

                    trade.fluctuation = fluct;
                })

        } catch (e) {
            return res.status(500).send({
                response: false,
                message: 'error getting stock price'
            })
        }
        return res.status(200).send({
            response: true,
            message: 'trade statistics',
            results
        })
    })



    next();
}



export { stocks };
