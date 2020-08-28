import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
  Student,
  fetchStudents,
  // addStudent,
  // updateStudent,
  deleteStudent,
} from '../../actions'
import { StoreState } from '../../reducers'
import StudentCard from './StudentsList/StudentCard'
import StudentForm from './StudentsList/StudentForm'
import Confirm from './StudentsList/Confirm'

interface Props {
  students: Student[]
  fetchStudents: () => void
  deleteStudent: typeof deleteStudent
  setShowModal: (key: boolean) => void
  setModalChildren: (jsx: JSX.Element | null) => void
}

const StudentsList: React.FC<Props> = ({
  students,
  fetchStudents,
  deleteStudent,
  setShowModal,
  setModalChildren,
}) => {
  const [fetching, setFetching] = useState<boolean>(false)

  useEffect(() => {
    setFetching(false)
  }, [students])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const openModal = (): void => {
    setShowModal(true)
  }

  const closeModal = (): void => {
    setShowModal(false)
  }

  const handleAdd = (): void => {
    setModalChildren(
      <StudentForm
        onCancel={closeModal}
        onSubmit={values => console.log(values)}
      />
    )
    openModal()
  }

  const handleDelete = (id: number): void => {
    const handleDelete = () => {
      deleteStudent(id)
      closeModal()
    }
    setModalChildren(<Confirm onCancel={closeModal} onConfirm={handleDelete} />)
    openModal()
  }

  const handleUpdate = (student: Student): void => {
    setModalChildren(
      <StudentForm
        student={student}
        onCancel={closeModal}
        onSubmit={console.log}
      />
    )
    openModal()
  }

  const renderList = (): JSX.Element[] =>
    students.map((student: Student) => (
      <StudentCard
        key={student.id}
        student={student}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    ))

  return (
    <div>
      <button onClick={handleAdd}>Add</button>
      {fetching && 'Loading...'}
      {renderList()}
    </div>
  )
}

const mapStateToProps = (state: StoreState) => {
  return { students: state.students }
}

export default connect(mapStateToProps, { fetchStudents, deleteStudent })(
  StudentsList
)
