import * as dotenv from 'dotenv';

dotenv.config();

export default {
    API: process.env.API || ''
}