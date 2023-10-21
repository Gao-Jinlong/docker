import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
    nullable: true,
  })
  desc: string;

  @OneToMany(() => User, (user) => user.departmentId, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  users: User[];
}
