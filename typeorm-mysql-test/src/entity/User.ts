import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    comment: 'user_id',
  })
  id: number;

  @Column({
    name: 'first_name',
    type: 'text',
    comment: 'first_name',
  })
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({
    unique: true,
    nullable: false,
    length: 50,
    type: 'varchar',
    default: null,
    comment: 'email',
  })
  email: string;
}
