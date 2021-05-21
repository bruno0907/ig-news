import { Client } from 'faunadb'

const fauna = new Client({
  secret: process.env.FAUNA_DB_API_KEY
})

export { fauna }