import { Student, Action, ActionTypes } from '../actions'

export const studentsReducer = (state: Student[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchStudents:
      return action.payload
    case ActionTypes.deleteStudent:
      return state.filter((student: Student) => action.payload !== student.id)
    default:
      return state
  }
}
