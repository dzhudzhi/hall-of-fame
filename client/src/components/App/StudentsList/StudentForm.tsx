import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Student, Grades } from '../../../actions'

interface Props {
  student?: Student
  onCancel: () => void
  onSubmit: (values: Student) => void
}

const StudentForm: React.FC<Props> = ({ student, onCancel, onSubmit }) => {
  const { register, handleSubmit, control } = useForm<Student>({
    defaultValues: student,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input
        name="name"
        placeholder="Type name"
        ref={register({
          required: true,
          maxLength: 30,
          pattern: /^[A-Za-zА-Яа-я ]+$/i,
        })}
      />
      <label>Birthdate</label>
      <Controller
        control={control}
        name="birthdate"
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <DatePicker
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            placeholderText="Choose date"
          />
        )}
      />
      <label>Grade</label>
      <select name="grade" ref={register({ required: true })}>
        {Object.keys(Grades).map((grade, i) => (
          <option value={grade} key={`grade-key-${i}`}>
            {grade}
          </option>
        ))}
      </select>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit">Save</button>
    </form>
  )
}

export default StudentForm
