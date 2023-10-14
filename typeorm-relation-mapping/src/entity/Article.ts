import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './Tag';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 100,
    comment: '标题',
  })
  title: string;

  @Column({
    type: 'text',
    comment: '文章内容',
  })
  content: string;

  @JoinTable() // 用于创建中间表（关联表），必须位于多对多关系的一方
  @ManyToMany(() => Tag, (tag) => tag.articles) // 指定多对多关系
  tags: Tag[];
}
