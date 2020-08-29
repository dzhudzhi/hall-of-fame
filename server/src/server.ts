import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'

import { config } from './config'
import studentsRoutes from './routes/students'

const app = new Koa()

const PORT = config.port

app.use(bodyParser())

app.use(logger())

app.use(studentsRoutes.routes())

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`)
  })
  .on('error', err => {
    console.error(err)
  })

export default server
