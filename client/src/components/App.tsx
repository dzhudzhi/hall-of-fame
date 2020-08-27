import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Student, fetchStudents, deleteStudent } from '../actions'
import { StoreState } from '../reducers'

interface AppProps {
  students: Student[]
  fetchStudents: Function
  deleteStudent: typeof deleteStudent
}

const App: React.FC<AppProps> = ({
  students,
  fetchStudents,
  deleteStudent,
}) => {
  const [fetching, setFetching] = useState<boolean>(false)

  useEffect(() => {
    setFetching(false)
  }, [students])

  const onButtonClick = (): void => {
    setFetching(true)
    fetchStudents()
  }

  const onTodoClick = (id: number): void => {
    deleteStudent(id)
  }

  const renderList = (): JSX.Element[] =>
    students.map((todo: Student) => (
      <div key={todo.id} onClick={() => onTodoClick(todo.id)}>
        {todo.title}
      </div>
    ))

  return (
    <div>
      <button onClick={onButtonClick}>Fetch</button>
      {fetching && 'Loading...'}
      {renderList()}
    </div>
  )
}

const mapStateToProps = (state: StoreState) => {
  return { students: state.students }
}

export default connect(mapStateToProps, { fetchStudents, deleteStudent })(App)
