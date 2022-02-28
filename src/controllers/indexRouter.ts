
import { app } from '../app';
import Knex from 'knex';
import { FastifyReply, FastifyRequest } from 'fastify';

declare module 'fastify'{
    export interface FastifyInstance{
        knex:Knex;
    }
}

export const health = (req: FastifyRequest, res: FastifyReply)=>res.status(200).send({
    response: true,
    message: 'everything is healthy'
})

export const eraseAllTrades = async (req: FastifyRequest, res: FastifyReply)=>{
    try{
        await app.knex('trades').delete();}
        catch(e){
            return res.status(400).send({
                response: false,
                message: 'error deleting trades'
            })
        }
        return res.status(200).send({
            response: true,
            message: 'all records were deleted.'        
        })
}