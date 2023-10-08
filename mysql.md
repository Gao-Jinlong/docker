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

```sql

CREATE TABLE student (
	id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Id',
    name VARCHAR(50) NOT NULL COMMENT '学生姓名',
    gender VARCHAR(10) NOT NULL COMMENT '性别',
    age INT NOT NULL COMMENT '年龄',
    class VARCHAR(50) NOT NULL COMMENT '班级名',
    score INT NOT NULL COMMENT ' 分数'
) CHARSET=utf8mb4

INSERT INTO student (name, gender, age, class, score) 
VALUES
	('张三', '男', 18, '一班', 90),
    ('李四', '女', 19, '二班', 84),
    ('王五', '男', 18, '三班', 92),
    ('赵六', '男', 20, '一班', 88),
    ('钱琪', '女', 18, '二班', 93),
    ('孙跋', '女', 19, '三班', 89),
    ('周酒', '男', 21, '一班', 80),
    ('黄诗', '女', 20, '二班', 77),
    ('刘诗怡', '女', 17, '三班', 82),
    ('唐氏儿', '男', 19, '一班', 75),
    ('宋十三', '男', 22, '二班', 79),
    ('孔思思', '女', 20, '三班', 70),
    ('王实物', '男', 21, '一班', 77),
    ('邵石柳', '男', 22, '二班', 73),
    ('徐诗琪', '女', 18, '三班', 82),
    ('宗施巴', '男', 23, '一班', 76),
    ('郑石臼', '女', 17, '二班', 84),
    ('赵尔诗', '女', 16, '三班', 93);
 
SELECT name as '姓名', age as '年龄', score as '成绩' FROM student WHERE age >=19 and gender='女';

-- 姓王的同学 
SELECT * FROM student WHERE name like '王%';
-- in 指定合集 not in 排除合集
SELECT * FROM student WHERE class not in ('一班', '二班');
-- between and 指定区间
SELECT * FROM student WHERE age between 18 and 20;
-- 分页
SELECT * FROM student LIMIT 0,5;
SELECT * FROM student LIMIT 5; -- 简写
-- 排序
SELECT * FROM student ORDER BY score ASC, age DESC;
-- 分组统计，各班级平均成绩,  sql 内置函数 AVG
SELECT class as '班级', AVG(score) AS '平均成绩' FROM student GROUP BY class ORDER BY '平均成绩' DESC;
-- 内置函数，count
SELECT class as '班级', count(*) as '人数' FROM student GROUP BY class;

-- 分组后还可以进一步过滤，但是不使用 WHERE 而是 HAVING
SELECT class, AVG(score) AS avg_score FROM student GROUP BY class HAVING avg_score > 82;
-- 去重
SELECT DISTINCT class FROM student; 

-- 内置函数
-- 聚合函数，用于数据的统计，如 AVG, COUNT, SUM, MIN, MAX
SELECT class AS '班级', AVG(score) AS '平均成绩', COUNT(*) AS '人数', SUM(score) AS '总成绩', MIN(score) AS '最低分', MAX(score) AS '最高分' FROM student GROUP BY class;
-- 字符串函数，用于处理字符串，如 CONCAT, SUBSTR, LENGTH, UPPER, LOWER
SELECT CONCAT(class, ' ', name), SUBSTR(name, 2,3), LENGTH(name), UPPER('UPCASE') FROM student;
-- 数值函数，用于处理数值，如 ROUND, CEIL, FLOOR, ABS, MOD
SELECT ROUND(AVG(score), 2), CEIL(AVG(score)), FLOOR(AVG(score)), ABS(-1), MOD(5, 2) FROM student GROUP BY class;
-- 日期函数，如 DATE, TIME, YEAR, MONTH, DAY
SELECT YEAR('2023-10-08 23:50:10'), MONTH('2023-10-08 23:50:10'), DAY('2023-10-08 23:50:10'), DATE('2023-10-08 23:50:10'), TIME('2023-10-08 23:50:10');
-- 条件函数，如 IF, CASE
SELECT name, IF(score >= 80, '及格', '不及格') FROM student;
SELECT name, score, CASE WHEN score >= 90 THEN '优秀' WHEN score >= 80 THEN '良好' ELSE '及格' END AS '等级' FROM student;
-- 系统函数, 用于获取系统信息，如 VERSION, DATABASE, USER
SELECT VERSION(), DATABASE(), USER();
-- 其他，NULLIF, COALESCE, GREATEST, LEAST
SELECT NULLIF(1,1), NULLIF(1,2); -- 相等返回 null，不相等返回第一个值
SELECT COALESCE(null, 1), COALESCE(null, null, 2); -- 返回第一个非 null 值
SELECT GREATEST(1,2,3), LEAST(1,2,3,4); -- 返回最大、最小值
-- 类型转换函数，CAST, CONVERT, DATE_FORMAT, STR_TO_DATE
SELECT GREATEST(1, '12', 3);
SELECT GREATEST(1, CONVERT('12', SIGNED), 3);
SELECT GREATEST(1, CAST('12' AS SIGNED), 3);
-- signed：整型；
-- unsigned：无符号整型
-- decimal：浮点型；
-- char：字符类型；
-- date：日期类型；
-- time：时间类型；
-- datetime：日期时间类型；
-- binary：二进制类型

SELECT DATE_FORMAT('2022-01-01', '%Y年%m月%d日');
SELECT STR_TO_DATE('2023-06-01', '%Y-%m-%d');
```