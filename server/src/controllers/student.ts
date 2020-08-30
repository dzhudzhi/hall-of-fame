import { BaseContext, Context } from 'koa'
import { getManager, Repository, Not, Equal } from 'typeorm'
import assert from 'assert'
import { Student } from '../entity/Student'
export default class StudentController {
  public static async getStudents(ctx: BaseContext) {
    // get a student repository to perform operations with student
    const studentRepository: Repository<Student> = getManager().getRepository(
      Student
    )
    // load all students
    const students: Student[] = await studentRepository.find()
    // return OK status code and loaded students array
    ctx.status = 200
    ctx.body = students
  }

  public static async createStudent(ctx: Context) {
    try {
      const studentRepository: Repository<Student> = getManager().getRepository(
        Student
      )
      const { name } = ctx.request.body
      const { birthdate } = ctx.request.body
      const { grade } = ctx.request.body

      assert.ok(name, 'Must be name')
      assert.ok(birthdate, 'Must be birthdate')
      assert.ok(['неуд', 'уд', 'хор', 'отл'].includes(grade), 'Incorrect grade')

      const studentToBeSaved = { name, birthdate, grade }

      const student = await studentRepository.save(studentToBeSaved)
      ctx.status = 201
      ctx.body = student
    } catch (e) {
      ctx.status = 500
      ctx.body = e.message
    }
  }

  public static async updateStudent(ctx: Context) {
    try {
      const studentRepository: Repository<Student> = getManager().getRepository(
        Student
      )

      const studentToBeUpdated: Student = await studentRepository.findOne(
        ctx.params.id
      )

      if (!studentToBeUpdated) {
        ctx.status = 400
        ctx.body = "The student doesn't exist"
      } else {
        const { name } = ctx.request.body
        const { birthdate } = ctx.request.body
        const { grade } = ctx.request.body

        name && (studentToBeUpdated.name = name)
        birthdate && (studentToBeUpdated.birthdate = birthdate)
        if (grade) {
          assert.ok(
            ['неуд', 'уд', 'хор', 'отл'].includes(grade),
            'Incorrect grade'
          )
          studentToBeUpdated.grade = grade
        }

        const student = await studentRepository.save(studentToBeUpdated)
        ctx.status = 201
        ctx.body = student
      }
    } catch (e) {
      ctx.status = 500
      ctx.body = e.message
    }
  }

  public static async deleteStudent(ctx: Context) {
    const studentRepository: Repository<Student> = getManager().getRepository(
      Student
    )

    const studentToBeDeleted: Student = await studentRepository.findOne(
      ctx.params.id
    )

    if (!studentToBeDeleted) {
      ctx.status = 400
      ctx.body = "The student doesn't exist"
    } else {
      await studentRepository.remove(studentToBeDeleted)
      ctx.status = 204
    }
  }
}
