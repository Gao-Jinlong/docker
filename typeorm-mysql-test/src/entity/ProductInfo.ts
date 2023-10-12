import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'product_info',
})
export class ProductInfo {
  @PrimaryGeneratedColumn({
    comment: 'product_id',
  })
  id: number;

  @Column({
    name: 'product_name',
    type: 'varchar',
    length: 50,
    comment: 'product_name',
  })
  productName: string;

  @Column({
    unique: true,
    nullable: false,
    length: 10,
    type: 'varchar',
    default: null,
  })
  code: string;
}
