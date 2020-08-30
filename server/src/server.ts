import 'reflect-metadata'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import logger from 'koa-logger'
import { createConnection } from 'typeorm'

import { config } from './config'
import studentsRoutes from './routes/students'
import { qaRouter } from './routes/qa-routes'

const app = new Koa()

const startServer = async () => {
  await createConnection()

  const PORT = config.port

  app.use(bodyParser())

  app.use(
    cors({
      origin: '*',
    })
  )

  app.use(logger())

  app.use(studentsRoutes.routes()).use(studentsRoutes.allowedMethods())

  app.use(qaRouter.routes())

  app
    .listen(PORT, async () => {
      console.log(`Server listening on port: ${PORT}`)
    })
    .on('error', err => {
      console.error(err)
    })
}

startServer()
