import axios from 'axios'
import { Dispatch } from 'redux'

import { ActionTypes } from './types'

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
    const response = await axios.get<Student[]>(
      'http://localhost:7654/students'
    )

    const data = response.data.map(student => ({
      ...student,
      birthdate: new Date(student.birthdate),
    }))

    dispatch<FetchStudentsAction>({
      type: ActionTypes.fetchStudents,
      payload: data,
    })
  }
}

export const addStudent = (student: Student) => {
  return async (dispatch: Dispatch) => {
    const headers = { ContentType: 'application/json' }
    const response = await axios.post<Student>(
      'http://localhost:7654/students',
      student,
      { headers }
    )

    const data = response.data
    data.birthdate = new Date(student.birthdate)

    dispatch<AddStudentAction>({
      type: ActionTypes.addStudent,
      payload: data,
    })
  }
}

export const deleteStudent = (id: number) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.delete(`http://localhost:7654/students/${id}`)

    const data = response.data

    dispatch<DeleteStudentAction>({
      type: ActionTypes.deleteStudent,
      payload: id,
    })
  }
}

export const updateStudent = (student: Student) => {
  return async (dispatch: Dispatch) => {
    const headers = { ContentType: 'application/json' }
    const response = await axios.put<Student>(
      `http://localhost:7654/students/${student.id}`,
      student,
      { headers }
    )

    const data = response.data
    data.birthdate = new Date(student.birthdate)

    dispatch<UpdateStudentAction>({
      type: ActionTypes.updateStudent,
      payload: data,
    })
  }
}

export const updateStudents = (student: Student): UpdateStudentAction => {
  return {
    type: ActionTypes.updateStudent,
    payload: student,
  }
}
