import {neon} from '@neondatabase/serverless'
import dotenv from 'dotenv'
dotenv.config();
const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;
// const PGUSER='neondb_owner'
// const PGPASSWORD='npg_5Bgo0WIYsXUD'
// const PGHOST='ep-raspy-water-a84flb59-pooler.eastus2.azure.neon.tech'
// const PGDATABASE='neondb'
// const ENDPOINT_ID='ep-raspy-water-a84flb59-pooler.eastus2.azure.neon.tech'


export const sql = neon(
    `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)