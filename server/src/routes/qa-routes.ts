import Router from 'koa-router'
import { TestData } from '../qa/createTestData'
export const qaRouter = new Router()

qaRouter.post('/qa/students', TestData.createTestUsers)
