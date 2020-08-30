import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export enum Grades {
  'неуд' = 'неуд',
  'уд' = 'уд',
  'хор' = 'хор',
  'отл' = 'отл',
}

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  birthdate: Date

  @Column('text')
  grade: Grades
}
