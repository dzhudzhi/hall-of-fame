import axios from 'axios'
import { Dispatch } from 'redux'

import { ActionTypes } from './types'

const url = 'https://jsonplaceholder.typicode.com/todos'

export interface Student {
  id: number
  title: string
  completed: boolean
}

export interface FetchStudentsAction {
  type: ActionTypes.fetchStudents
  payload: Student[]
}

export interface DeleteStudentAction {
  type: ActionTypes.deleteStudent
  payload: number
}

export const fetchStudents = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Student[]>(url)

    dispatch<FetchStudentsAction>({
      type: ActionTypes.fetchStudents,
      payload: response.data,
    })
  }
}

export const deleteStudent = (id: number): DeleteStudentAction => {
  return {
    type: ActionTypes.deleteStudent,
    payload: id,
  }
}
