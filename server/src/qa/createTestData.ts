import { BaseContext } from 'koa'
import { getConnection } from 'typeorm'
import { Student, Grades } from '../entity/Student'
//Creating a class so we can later extend it to include creation of more test data
export class TestData {
  //This handles creating test users. Seperate functions can be added for other test data later.
  public static async createTestUsers(ctx: BaseContext) {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Student)
        .values([
          {
            name: 'Michael',
            birthdate: new Date('1985-02-23'),
            grade: Grades['хор'],
          },
          {
            name: 'Louise',
            birthdate: new Date('1990-10-15'),
            grade: Grades['отл'],
          },
          {
            name: 'Mary',
            birthdate: new Date('1995-03-18'),
            grade: Grades['уд'],
          },
        ])
        .execute()
      //Return a success message if theer are no errors
      ctx.body = 'Test users created successfully'

      //Catch any errors and return a 500 error status to the user is there are errors
    } catch (err) {
      // will only respond with JSON
      ctx.status = err.statusCode || err.status || 500
      ctx.body = {
        message: err.message,
      }
    }
  }
}
