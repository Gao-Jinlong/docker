
-- sql 不区分大小写

-- DDL 语句（Data Definition Language）：数据定义语言，用来定义数据库对象：数据库、表、列等。关键字：create、drop、alter 等。

-- DML 语句（Data Manipulation Language）：数据操作语言，用来对数据库中表的数据进行增删改。关键字：insert、delete、update 等。

-- DQL 语句（Data Query Language）：数据查询语言，用来查询数据库中表的记录（数据）。关键字：select、from、where 等。

-- DCL 语句（Data Control Language）：数据控制语言，用来定义数据库的访问权限和安全级别，及创建用户。关键字：grant、revoke 等。

-- TCL 语句（Transaction Control Language）：事务控制语言，用来管理事务。关键字：commit、rollback 等。

use `hello-mysql`;

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

SELECT * FROM `hello-mysql`.student;

INSERT INTO `hello-mysql`.`student` (`name`, `age`, `sex`, `email`, `create_time`) VALUES ('ginlon', '18', '1', 'ginlon@gmail.com', '2023-10-07 00:14:00');
INSERT INTO `hello-mysql`.`student` (`name`, `age`, `sex`, `email`, `create_time`) VALUES ('xiaoming', '23', '1', 'xiaoming@163.com', '2023-04-22 10:30:00');
INSERT INTO `hello-mysql`.`student` (`name`, `age`, `sex`, `email`, `create_time`) VALUES ('xioahong', '20', '0', 'xiaohong@qq.com', '2022-03-03 03:03:03');
INSERT INTO `hello-mysql`.`student` (`name`, `age`, `sex`, `email`, `create_time`) VALUES ('liwei', '19', '1', 'liwei@gmail.com', '2023-10-04 10:33:05');

UPDATE `hello-mysql`.`student` SET `email` = 'xiaohong@163.com' WHERE (`id` = '3');
DELETE FROM `hello-mysql`.`student` WHERE (`id` = '4');

TRUNCATE `hello-mysql`.`student`;
DROP TABLE `hello-mysql`.`student`;

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
-- datetime：日期时间类型；user
-- binary：二进制类型

SELECT DATE_FORMAT('2022-01-01', '%Y年%m月%d日');
SELECT STR_TO_DATE('2023-06-01', '%Y-%m-%d');

CREATE TABLE user(
id int not null auto_increment comment 'ID',
name varchar(45) not null comment '名字',
primary key (id)
);

CREATE TABLE id_card(
id INT NOT NULL AUTO_INCREMENT COMMENT 'ID',
card_name VARCHAR(45) NOT NULL COMMENT '身份证号',
user_id INT NOT NULL COMMENT '用户 ID',
PRIMARY KEY (id),
INDEX card_id_idx (user_id asc) VISIBLE, -- 用于建立索引，索引名 card_id_idx，用于加速 user_id 访问
CONSTRAINT user_id -- 这里的 `user_id` 表示约束的名称，用于标识外键约束，以便将来需要引用或删除该约束时使用，名称可自定义，需要在数据库中唯一
	FOREIGN KEY (user_id) -- 添加外键约束
    REFERENCES `hello-mysql`.user (id) -- 指定 user_id 引用 user 表的 id 列
    ON DELETE NO ACTION
    ON UPDATE NO ACTION -- 主表更新时采取的动作
    -- CASCADE 主表主键更新，从表关联记录的外键跟着更新，主表记录删除，从表关联记录删除
    -- SET NULL 主表主键更新或者主表记录删除，从表关联记录的外键设为 NULL
    -- RESTRICT 只有从表没有关联记录时，才允许删除主表记录或者更新主表记录的主键 Id
    -- NO ACTION 同 RESTRICT，sql 标准分了 4 种，mysql 里 NOT ACTION 等同于 RESTRICT
);

select * from user;

insert into user (name) 
values ('张三'),('李四'),('王五'),('赵六'),('孙琦'),('周八'),('乌桕'),('郑十'),('钱十二'),('李十三');

INSERT INTO id_card (card_name, user_id) 
    VALUES
        ('110101199001011234',1),
	('310101199002022345',2),
	('440101199003033456',3),
	('440301199004044567',4),
	('510101199005055678',5),
	('330101199006066789',6),
	('320101199007077890',7),
	('500101199008088901',8),
	('420101199009099012',9),
	('610101199010101023',10);
    
select * from id_card;

SELECT user.id, name, id_card.id as card_id, card_name 
	FROM user 
	INNER JOIN id_card ON user.id=id_card.user_id;
    -- INNER 是返回两个表中可以关联上的数据
    -- LEFT 额外返回左表中未关联上的数据
    -- RIGHT 额外返回右表中未关联上的数据，join 前是左表，后是右表

-- 一对多
create table department(
id int not null auto_increment comment 'id',
name varchar(45) not null comment '名称',
primary key (id)
);

create table employee (
id int not null auto_increment comment 'id',
name varchar(45) not null comment '姓名',
department_id int null comment '部门 id',
primary key(id),
index deparment_id_idx (department_id asc) visible,
constraint deparment_id
	foreign key (department_id)
    references `hello-mysql`.department (id)
    on delete set null
    on update set null
);

INSERT INTO `department` (`id`, `name`) 
    VALUES 
        (1, '人事部'),
        (2, '财务部'),
        (3, '市场部'),
        (4, '技术部'),
        (5, '销售部'),
        (6, '客服部'),
        (7, '采购部'),
        (8, '行政部'),
        (9, '品控部'),
        (10, '研发部');

select * from department;

INSERT INTO `employee` (`id`, `name`, `department_id`)
    VALUES 
        (1, '张三', 1),
        (2, '李四', 2), 
        (3, '王五', 3),
        (4, '赵六', 4),
        (5, '钱七', 5),
        (6, '孙八', 5),
        (7, '周九', 5),
        (8, '吴十', 8),
        (9, '郑十一', 9),
        (10, '王十二', 10);
        
select * from employee;

select * from department
	join employee on department.id = employee.department_id
    where department.id =5;

-- 多对多
create table article (
id int not null auto_increment comment 'Id',
title varchar(50) not null  comment '标题',
content text not null comment '内容', -- TEXT 长文本类型，可以存储 65535 长度的字符换
primary key (id)
);

select * from article;

INSERT INTO `article` (`title`, `content`)
    VALUES
            ('文章1', '这是文章1的内容。'),
            ('文章2', '这是文章2的内容。'),
            ('文章3', '这是文章3的内容。'),
            ('文章4', '这是文章4的内容。'),
            ('文章5', '这是文章5的内容。');

create table tag(
id int not null auto_increment comment 'id',
name varchar(50) not null,
primary key (id)
);
select * from tag;
INSERT INTO `tag` (`name`)
    VALUES
            ('标签1'),
            ('标签2'),
            ('标签3'),
            ('标签4'),
            ('标签5');
            
-- 通过中间表描述多对多的关系，使用复合主键
create table `hello-mysql`.article_tag(
	article_id int not null,
	tag_id int not null,
	primary key (article_id, tag_id), -- 复合主键
	index tag_id_idx (tag_id asc) visible,
	constraint article_id
		foreign key (article_id)
        references `hello-mysql`.article (id)
        on delete cascade -- 中间表的级联方式设为 cascade，否则丢失了关系也就没有意义了
        on update cascade,
	constraint tag_id
		foreign key (tag_id)
        references `hello-mysql`.tag (id)
        on delete cascade
        on update cascade
);
select * from article_tag;
INSERT INTO `article_tag` (`article_id`, `tag_id`)
    VALUES
    (1,1), (1,2), (1,3),
    (2,2), (2,3), (2,4),
    (3,3), (3,4), (3,5),
    (4,4), (4,5), (4,1),
    (5,5), (5,1), (5,2);

select  t.name as 标签名, a.title as 文章标题 from article a
	join article_tag at on a.id=at.article_id
    join tag t on t.id=at.tag_id
    where a.id=2;

delete from article where id =1;

-- 嵌套查询，查询最高分的姓名和班级
SELECT name, class, score FROM student WHERE score = (SELECT MAX(score) FROM student);
-- 查询成绩高于平均分的学生
select * from student where score > (select avg(score) from student);
-- EXISTS, NOT EXISTS
-- EXISTS，对于每个 department 查询它所有的 employee 如果存在员工，则条件成立，返回部门 name
SELECT name FROM department
	WHERE EXISTS(
		SELECT * FROM employee WHERE department.id = employee.department_id
    );
    
SELECT * FROM department
	WHERE NOT EXISTS (
		SELECT * FROM employee WHERE department.id = employee.department_id
    );
    
CREATE TABLE product (
     id INT PRIMARY KEY,
     name VARCHAR(50),
     price DECIMAL(10,2),
     category VARCHAR(50),
     stock INT
);

INSERT INTO product (id, name, price, category, stock)
	VALUES 
		(1, 'iPhone12',6999.00, '手机',100),
		(2, 'iPad Pro',7999.00, '平板电脑',50),
		(3, 'MacBook Pro',12999.00, '笔记本电脑',30),
		(4, 'AirPods Pro',1999.00, '耳机',200),
		(5, 'Apple Watch',3299.00, '智能手表',80);
    
SELECT name, price FROM product WHERE price = (SELECT MAX(price) FROM product);

create table avg_price_by_category (
	id int auto_increment,
    category varchar(50) not null,
    avg_price decimal(10, 2) not null, -- 共 10 位，小数点后两位
    primary key (id)
);

INSERT INTO avg_price_by_category (category, avg_price) 
	SELECT category, AVG(price) FROM product GROUP BY category;

UPDATE employee SET name = CONCAT('技术-', name)
	WHERE department_id = (
		SELECT id FROM department WHERE name ='技术部'
    );
    
DELETE FROM employee WHERE department_id = (
	SELECT id FROM department WHERE name = '技术部'
);

