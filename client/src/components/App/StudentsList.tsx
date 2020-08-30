import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
  Student,
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from '../../actions'
import { StoreState } from '../../reducers'
import StudentCard from './StudentsList/StudentCard'
import StudentForm from './StudentsList/StudentForm'
import Confirm from './StudentsList/Confirm'
import './StudentsList/style.css'

interface Props {
  students: Student[]
  fetchStudents: () => void
  addStudent: (student: Student) => void
  updateStudent: (student: Student) => void
  deleteStudent: (id: number) => void
  setShowModal: (key: boolean) => void
  setModalChildren: (jsx: JSX.Element | null) => void
}

const StudentsList: React.FC<Props> = ({
  students,
  fetchStudents,
  addStudent,
  updateStudent,
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

  const onAdd = (): void => {
    const handleAdd = (values: Student) => {
      addStudent(values)
      closeModal()
    }
    setModalChildren(<StudentForm onCancel={closeModal} onSubmit={handleAdd} />)
    openModal()
  }

  const onDelete = (id: number): void => {
    const handleDelete = () => {
      deleteStudent(id)
      closeModal()
    }
    setModalChildren(<Confirm onCancel={closeModal} onConfirm={handleDelete} />)
    openModal()
  }

  const onUpdate = (student: Student): void => {
    const handleUpdate = (values: Student) => {
      updateStudent({ ...values, id: student.id })
      closeModal()
    }
    setModalChildren(
      <StudentForm
        student={student}
        onCancel={closeModal}
        onSubmit={handleUpdate}
      />
    )
    openModal()
  }

  const renderList = (): JSX.Element[] =>
    students.map((student: Student) => (
      <StudentCard
        key={student.id}
        student={student}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    ))

  return (
    <div className="students-list">
      <div className="students-list__container">
        <div>
          <button className="students-list__add-button" onClick={onAdd}>
            Add
          </button>
        </div>
        <header className="students-list__header">
          <strong>Name</strong>
          <strong>Birthdate</strong>
          <strong>Grade</strong>
          <strong>Actions</strong>
        </header>
        {fetching && 'Loading...'}
        {renderList()}
      </div>
    </div>
  )
}

const mapStateToProps = (state: StoreState) => {
  return { students: state.students }
}

export default connect(mapStateToProps, {
  fetchStudents,
  deleteStudent,
  updateStudent,
  addStudent,
})(StudentsList)
