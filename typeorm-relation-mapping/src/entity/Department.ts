import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './Employee';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  // 一对多关系，通过第二个参数指定外键，一对多关系中，外键列在多的一方，因此不需要使用 @JoinColumn
  @OneToMany(() => Employee, (employee) => employee.department, {
    cascade: true,
  })
  employees: Employee[];
}
