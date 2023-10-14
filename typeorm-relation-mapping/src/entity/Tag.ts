import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './Article';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 100,
  })
  name: string;

  @ManyToMany(() => Article, (article) => article.tags) // 多对多关系，都不维护外键，所以需要指定外键列
  articles: Article[];
}
