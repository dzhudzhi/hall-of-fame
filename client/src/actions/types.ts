import {
  FetchStudentsAction,
  AddStudentAction,
  DeleteStudentAction,
  UpdateStudentAction,
} from '../actions'

export enum ActionTypes {
  fetchStudents,
  addStudent,
  deleteStudent,
  updateStudent,
}

export type Action =
  | FetchStudentsAction
  | AddStudentAction
  | DeleteStudentAction
  | UpdateStudentAction
