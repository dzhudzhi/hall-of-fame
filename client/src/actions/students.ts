import axios from 'axios'
import { Dispatch } from 'redux'

import { ActionTypes } from './types'

const url = 'https://jsonplaceholder.typicode.com/users'

export enum Grades {
  'неуд' = 'неуд',
  'уд' = 'уд',
  'хор' = 'хор',
  'отл' = 'отл',
}

export interface Student {
  id?: number
  name: string
  birthdate: Date
  grade: Grades
}

export interface FetchStudentsAction {
  type: ActionTypes.fetchStudents
  payload: Student[]
}

export interface AddStudentAction {
  type: ActionTypes.addStudent
  payload: Student
}

export interface DeleteStudentAction {
  type: ActionTypes.deleteStudent
  payload: number
}

export interface UpdateStudentAction {
  type: ActionTypes.updateStudent
  payload: Student
}

export const fetchStudents = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Student[]>(url)

    // const birthdate = new Date()
    // const birthdateString = `${birthdate.getFullYear()}-${padS(
    //   birthdate.getMonth() + 1
    // )}-${birthdate.getDay()}`

    const data = response.data.map(({ id, name }) => ({
      id,
      name,
      birthdate: new Date(),
      grade: Grades['хор'],
    }))

    dispatch<FetchStudentsAction>({
      type: ActionTypes.fetchStudents,
      payload: data,
    })
  }
}

export const addStudent = (student: Student): AddStudentAction => {
  return {
    type: ActionTypes.addStudent,
    payload: student,
  }
}

export const deleteStudent = (id: number): DeleteStudentAction => {
  return {
    type: ActionTypes.deleteStudent,
    payload: id,
  }
}

export const updateStudent = (student: Student): UpdateStudentAction => {
  return {
    type: ActionTypes.updateStudent,
    payload: student,
  }
}
