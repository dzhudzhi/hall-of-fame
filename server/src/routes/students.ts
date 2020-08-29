import { Context } from 'koa'
import Router from 'koa-router'

const router = new Router()

router.get('/students', async (ctx: Context) => {
  try {
    ctx.body = {
      students: [
        { id: 1, name: 'Sanal', birthdate: new Date(), grade: 'отл' },
        { id: 2, name: 'Mergen', birthdate: new Date(), grade: 'хор' },
        { id: 3, name: 'Tolik', birthdate: new Date(), grade: 'хор' },
      ],
    }
  } catch (e) {
    console.error(e)
  }
})

export default router
