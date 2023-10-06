```sql
-- 切换到指定的数据库中，切换后执行 sql 不指定库名默认在当前库中
use `hello-mysql`;
-- 创建表
CREATE TABLE `student` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(45) NOT NULL COMMENT '名字',
  `age` int DEFAULT NULL COMMENT '年龄',
  `sex` int DEFAULT NULL COMMENT '性别',
  `email` varchar(60) DEFAULT NULL COMMENT '邮箱',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `status` int DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) CHARSET=utf8mb4

-- 查询表
SELECT * FROM `hello-mysql`.student;
-- 插入表
INSERT INTO `hello-mysql`.`student` (`name`, `age`, `sex`, `email`, `create_time`) VALUES ('ginlon', '18', '1', 'ginlon@gmail.com', '2023-10-07 00:14:00');
INSERT INTO `hello-mysql`.`student` (`name`, `age`, `sex`, `email`, `create_time`) VALUES ('xiaoming', '23', '1', 'xiaoming@163.com', '2023-04-22 10:30:00');
INSERT INTO `hello-mysql`.`student` (`name`, `age`, `sex`, `email`, `create_time`) VALUES ('xioahong', '20', '0', 'xiaohong@qq.com', '2022-03-03 03:03:03');
INSERT INTO `hello-mysql`.`student` (`name`, `age`, `sex`, `email`, `create_time`) VALUES ('liwei', '19', '1', 'liwei@gmail.com', '2023-10-04 10:33:05');
-- 更新记录
UPDATE `hello-mysql`.`student` SET `email` = 'xiaohong@163.com' WHERE (`id` = '3');
-- 删除记录
DELETE FROM `hello-mysql`.`student` WHERE (`id` = '4');

-- 清空表
TRUNCATE `hello-mysql`.`student`;
-- 删除表
DROP TABLE `hello-mysql`.`student`;
```

sql 不区分大小写

DDL 语句（Data Definition Language）：数据定义语言，用来定义数据库对象：数据库、表、列等。关键字：create、drop、alter 等。

DML 语句（Data Manipulation Language）：数据操作语言，用来对数据库中表的数据进行增删改。关键字：insert、delete、update 等。

DQL 语句（Data Query Language）：数据查询语言，用来查询数据库中表的记录（数据）。关键字：select、from、where 等。

DCL 语句（Data Control Language）：数据控制语言，用来定义数据库的访问权限和安全级别，及创建用户。关键字：grant、revoke 等。

TCL 语句（Transaction Control Language）：事务控制语言，用来管理事务。关键字：commit、rollback 等。
