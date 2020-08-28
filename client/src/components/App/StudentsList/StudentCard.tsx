import React from 'react'

import { Student } from '../../../actions'

interface Props {
  student: Student
  handleUpdate: (student: Student) => void
  handleDelete: (id: number) => void
}

const StudentCard: React.FC<Props> = ({
  student,
  handleUpdate,
  handleDelete,
}): JSX.Element => {
  return (
    <div key={student.id}>
      <span>{student.name}</span>
      <span>{student.birthdate.toLocaleDateString()}</span>
      <span>{student.grade}</span>
      <button onClick={() => handleUpdate(student)}>Edit</button>
      <button onClick={() => handleDelete(student.id!)}>Delete</button>
    </div>
  )
}

export default StudentCard
