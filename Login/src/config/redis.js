import {createClient} from 'redis'
import logger from './logger'

export const client = createClient()

const clientRedis = async() =>{
    try{
        await client.connect()
        logger.info('connected to redis database')
    }
    catch(error){
        logger.error('Could not connect to the redis database', error)
    }
}

export default clientRedis;