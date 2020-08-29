import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Student, Grades } from '../../../actions'
import './StudentForm/style.css'

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
      <div className="student-form__container">
        <label className="student-form__input-field">
          <span>Name</span>
          <input
            name="name"
            placeholder="Type name"
            ref={register({
              required: true,
              maxLength: 30,
              pattern: /^[A-Za-zА-Яа-я ]+$/i,
            })}
          />
          <span className="student-form__input-error--hidden">error text</span>
        </label>
        <label className="student-form__input-field">
          <span>Birthdate</span>
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
          <span className="student-form__input-error--hidden">error text</span>
        </label>
        <label className="student-form__input-field">
          <span>Grade</span>
          <select name="grade" ref={register({ required: true })}>
            {Object.keys(Grades).map((grade, i) => (
              <option value={grade} key={`grade-key-${i}`}>
                {grade}
              </option>
            ))}
          </select>
          <span className="student-form__input-error--hidden">error text</span>
        </label>
        <footer className="student-form__footer">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </footer>
      </div>
    </form>
  )
}

export default StudentForm
