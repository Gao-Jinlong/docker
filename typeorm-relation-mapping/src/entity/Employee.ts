import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from './Department';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
  })
  name: string;

  // 多对一关系（一对多）
  @ManyToOne(() => Department, {
    // cascade: true, // 当一对多指定了 cascade 时，多对一需要去掉 cascade，否则会导致循环引用
    onDelete: 'CASCADE', // 删除主表时，级联删除关联表
    onUpdate: 'CASCADE', // 更新主表时，级联更新关联表
  })
  department: Department;
}
