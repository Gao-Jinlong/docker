import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { ProductInfo } from './entity/ProductInfo';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'ginlon',
  database: 'practice',
  synchronize: true, // 同步建表，当 database 中没有和 Entity 对应的表时，会自动生成建表 sql 并执行
  logging: true, // 打印 sql 语句
  entities: [User, ProductInfo], // 指定有哪些和数据库的表对应的 Entity，除了 class 还可以使用 ['./**/entity/*.ts'] 的形式
  migrations: [], // 数据库迁移，一般不用
  subscribers: [], // Entity 生命周期的订阅者，如 insert, update, remove 前后可以加入一些逻辑
  connectorPackage: 'mysql2', // mysql2 为 mysql 驱动
  poolSize: 10, // 连接池大小
  // 额外配置
  extra: {
    authPlugin: 'sha256_password', // mysql8.0 以上版本需要配置，密码加密方式
  },
});
