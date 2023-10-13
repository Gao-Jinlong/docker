import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { IdCard } from './IdCard';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToOne(
    () => IdCard,
    // 标识一对一关系的关联字段在目标实体的哪个字段上
    (idCard) => idCard.user,
  )
  idCard: IdCard;
}
