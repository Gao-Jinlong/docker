import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class IdCard {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
    comment: '身份证号',
  })
  cardName: string;

  @JoinColumn()
  @OneToOne(() => User, {
    cascade: true, // 一对一关系中，是否创建关联对象
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
