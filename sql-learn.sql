create database practice;

use practice;

-- users 存储客户信息
create table if not exists customers (
	id int(11) not null auto_increment comment '客户 id',
    name varchar(255) not null comment '客户姓名',
    primary key (id)
) engine = innoDB default charset = utf8mb4 comment='客户信息表';

-- orders 存储订单信息
create table if not exists orders (
	id int(11) not null auto_increment comment '订单 id',
    customer_id int(11) not null comment '客户 id',
    order_date date not null comment '订单日期',
    total_amount decimal(10, 2) not null comment '订单金额',
    primary key (id),
    foreign key (customer_id) references customers (id) on delete cascade on update cascade
)engine=InnoDB default charset=utf8mb4 comment='订单信息表';

-- order_items 用于存储订单商品信息
create table if not exists order_items (
	id int(11) not null auto_increment comment '商品 id',
    order_id int(11) not null comment '订单 id',
    product_name varchar(255) not null comment '商品名称',
    quantity int(11) not null comment '商品数量',
    price decimal (10, 2) not null comment '商品单价',
    primary key (id),
    foreign key (order_id) references orders (id) on delete cascade
) engine=InnoDB default charset=utf8mb4 comment = '订单商品信息表';

-- 向 customers 表插入数据
INSERT INTO `customers` (`name`) 
    VALUES 
        ('张丽娜'),('李明'),('王磊'),('赵静'),('钱伟'),
        ('孙芳'),('周涛'),('吴洋'),('郑红'),('刘华'),
        ('陈明'),('杨丽'),('王磊'),('张伟'),('李娜'),
        ('刘洋'),('陈静'),('杨阳'),('王丽'),('张强');

-- 向 orders 表插入数据
INSERT INTO `orders` (`customer_id`, `order_date`, `total_amount`)
    VALUES
        (1, '2022-01-01',100.00),(1, '2022-01-02',200.00),
        (2, '2022-01-03',300.00),(2, '2022-01-04',400.00),
        (3, '2022-01-05',500.00),(3, '2022-01-06',600.00),
        (4, '2022-01-07',700.00),(4, '2022-01-08',800.00),
        (5, '2022-01-09',900.00),(5, '2022-01-10',1000.00);

-- 向 order_items 表插入数据
INSERT INTO `order_items` (`order_id`, `product_name`, `quantity`, `price`)
    VALUES
        (1, '耐克篮球鞋',1,100.00),
        (1, '阿迪达斯跑步鞋',2,50.00),
        (2, '匡威帆布鞋',3,100.00),
        (2, '万斯板鞋',4,50.00),
        (3, '新百伦运动鞋',5,100.00),
        (3, '彪马休闲鞋',6,50.00),
        (4, '锐步经典鞋',7,100.00),
        (5, '亚瑟士运动鞋',10,50.00),
        (5, '帆布鞋',1,100.00),
        (1, '苹果手写笔',2,50.00),
        (2, '电脑包',3,100.00),
        (3, '苹果手机',4,50.00),
        (4, '苹果耳机',5,100.00),
        (5, '苹果平板',7,100.00);
        
select * from customers;

select * from orders;

select * from order_items;

-- 需求 1 查询订单总金额前三的客户
select customers.name, sum(orders.total_amount) as total_amount
 from customers
 inner join orders on customers.id = orders.customer_id
 group by customers.id
 order by total_amount desc
 limit 0,3;
 
 -- 需求 2 查询每个客户的订单总金额，并计算占比
 select customers.name, sum(orders.total_amount) as total_amount, 
 sum(orders.total_amount)/(select sum(total_amount) from orders) as percentage
 from customers
 inner join orders on customers.id=orders.customer_id
 group by customers.id;

-- 需求 3 查询每个客户的订单总金额，并列出每个订单的商品信息
select customers.name, orders.order_date, orders.total_amount,
	order_items.product_name, order_items.quantity, order_items.price
    from customers
    join orders on customers.id = orders.customer_id
    join order_items on orders.id = order_items.order_id
    order by customers.name, orders.order_date;
    
-- 需求 4 查询每个客户的订总金额，并列出每个订单的商品清单，同时只显示客户名字姓张的记录：alter
select customers.name, orders.order_date, orders.total_amount, orders.total_amount,
	order_items.product_name, order_items.quantity, order_items.price
    from customers
    join orders on customers.id = orders.customer_id
    join order_items on orders.id = order_items.order_id
    where customers.name like '张%'
    order by customers.name, orders.order_date;

-- 需求 5 查询每个客户的订单总金额，并列出每个订单的商品清单，同时只显示订单日期在 2022 年 1 月 1 日到 2022 年 1 月 3 日之间的记录
select customers.name, orders.order_date, orders.total_amount, orders.total_amount,
	order_items.product_name, order_items.quantity, order_items.price
    from customers
    join orders on customers.id = orders.customer_id
    join order_items on orders.id = order_items.order_id
    where orders.order_date between '2022-01-01' and '2022-01-03'
    order by customers.name, orders.order_date;
    
-- 需求 6 查询每个客户的订单总金额，并计算商品数量，只包含商品名称包含"鞋"的商品，商品名称用 - 链接，显示前三条记录：
select 
	c.name as customer_name, 
	sum(o.total_amount) as total_amount, 
	count(oi.id) as total_amount, 
    group_concat(oi.product_name separator '-') as product_name -- 拼接分组后订单中的商品名
	from customers c
    join orders o on c.id = o.customer_id
    join order_items oi on oi.order_id = o.id
    where oi.product_name like '%鞋%'
	group by c.name
    order by total_amount desc
    limit 3;
    
-- 需求 7 查询存在订单的客户
select * from customers c
where exists (select 1 from orders o where o.customer_id = c.id);

-- 需求 8 王磊的订单总金额打九折
update orders o set o.total_amount = o.total_amount * 0.9
 where o.customer_id in (
	select id from customers where name = '王磊'
 );
 
 select * from orders 
 join customers on orders.customer_id = customers.id
 where customers.name = '王磊';
 
-- 事务
select * from order_items;
 
-- 开启事务
START TRANSACTION;

UPDATE order_items SET quantity=1 WHERE order_id=3;
-- 回滚操作
ROLLBACK;

select * from order_items where order_id=3;

UPDATE orders SET total_amount=200 WHERE id=3;

-- 提交修改，提交后无法回滚
COMMIT;

select * from orders;


-- 回滚记录点
START TRANSACTION;

SAVEPOINT start_operation;

UPDATE order_items SET quantity=3 WHERE order_id=3;

SAVEPOINT after_update_quantity;

UPDATE orders SET total_amount=600 WHERE id=3;

SAVEPOINT update_finished;

ROLLBACK TO SAVEPOINT after_update_quantity;

ROLLBACK TO SAVEPOINT update_finished;

COMMIT;

-- 当修改多个有关联的表时，事务是必须的，要么全部成功，要么全部失败，保持数据的一致性。

-- 在事务 commit 前，能否看到事务修改的数据？
-- 事物隔离：
-- mysql 有四种事务隔离级别

-- READ UNCOMMITTED: 可以读到别的事务尚未提交的数据。
-- 问题：不可重读——每次独到的数据可能不一致，如果读到的数据被回滚了，读到的就是临时数据，这个问题叫做脏读

-- READ COMMITTED: 只读别的事务已经提交的数据
-- 不存在脏读的问题，但不可重读的问题仍然存在，不只是数据不一样，有可能两次读取到的记录行数也不一致，称为幻读

-- REPEATABLE READ: 在同一事务内，多次读取数据将保证结果相同
-- 解决了不可重读的问题，但仍然存在幻读

-- SERIALIZABLE: 在同一时间只允许一个事务修改数据（数据库锁）
-- 事务一个一个执行，不存在一致性问题，性能很差

-- 四种级别主要是数据一致性和并发性能的差别，一致性越好，并发性能却差

-- 查询当前的事务隔离级别
select @@transaction_isolation
-- 一般使用默认值即可


