import { Context } from 'koa'
import Router from 'koa-router'
import studentController from '../controllers/student'

const router = new Router()

router.get('/students', studentController.getStudents)

router.post('/students', studentController.createStudent)

router.put('/students/:id', studentController.updateStudent)

router.delete('/students/:id', studentController.deleteStudent)

export default router
