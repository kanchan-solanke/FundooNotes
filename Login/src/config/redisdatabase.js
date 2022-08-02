import {createClient} from "redis";
import logger from './logger';

export const client = createClient();

const clientRedis = async() =>{
    try{
        await client.connect();
        logger.info('Connected to redis datbase');
    }catch(error){
        logger.error('could not connect to the redis database', error);
    }
}
export default clientRedis;