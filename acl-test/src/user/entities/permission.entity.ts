import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum PermissionEnum {
  Normal = 1 << 0,
  Admin = 1 << 1,
  SuperAdmin = 1 << 3,
}
export const PermissionEnumTitle = {
  [PermissionEnum.Normal]: '普通用户',
  [PermissionEnum.Admin]: '管理员',
  [PermissionEnum.SuperAdmin]: '超级管理员',
} as const;

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @PrimaryColumn({})
  weight: number;

  @Column({
    length: 50,
    nullable: true,
  })
  desc: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => User)
  users: User[];
}
