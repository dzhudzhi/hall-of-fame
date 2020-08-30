import React from 'react'

import { Student } from '../../../actions'
import './StudentCard/style.css'

interface Props {
  student: Student
  onUpdate: (student: Student) => void
  onDelete: (id: number) => void
}

const StudentCard: React.FC<Props> = ({
  student,
  onUpdate,
  onDelete,
}): JSX.Element => {
  return (
    <div key={student.id} className="student-card">
      <span>{student.name}</span>
      <span>{student.birthdate.toLocaleDateString()}</span>
      <span>{student.grade}</span>
      <div className="student-card__actions">
        <button onClick={() => onUpdate(student)}>Edit</button>
        <button onClick={() => onDelete(student.id!)}>Delete</button>
      </div>
    </div>
  )
}

export default StudentCard
