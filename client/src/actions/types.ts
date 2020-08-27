import { FetchStudentsAction, DeleteStudentAction } from '../actions'

export enum ActionTypes {
  fetchStudents,
  deleteStudent,
}

export type Action = FetchStudentsAction | DeleteStudentAction
