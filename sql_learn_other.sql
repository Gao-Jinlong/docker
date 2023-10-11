-- 视图、存储过程、函数

use practice;

-- 建立视图
CREATE VIEW customer_orders AS
	SELECT 
		c.name AS customer_name,
        o.id AS order_id,
        o.order_date,
        o.total_amount
	FROM customers c
    JOIN orders o ON c.id=o.customer_id;

-- 查询视图
select * from customer_orders;

-- 视图可以简化查询，还可以控制权限，使得开发者只能看到需要的字段，隐藏其余字段
-- 视图一般只做查询，因为增删改限制比较多，如只有单表视图可以增删改，且要求不在视图中的字段要有默认值


-- 存储过程
-- 修改分隔符为 $$ 避免 `;` 中止 sql
DELIMITER $$
CREATE PROCEDURE get_customer_orders(IN customer_id INT)
	BEGIN
		SELECT o.id AS order_id, o.order_date, o.total_amount
		FROM orders o 
			WHERE o.customer_id = customer_id;
END $$
DELIMITER ;

-- 调用存储过程
CALL get_customer_orders(5);

-- 存储过程封装 sql, 使用 call 传递参数调用


-- 如果想调用时返回值，可以使用函数
-- 求平方的函数
DELIMITER $$
CREATE FUNCTION square(x INT)
RETURNS INT
BEGIN
	DECLARE result INT;
    SET result = x * x;
    RETURN result;
END $$
DELIMITER ;
-- mysql 默认不允许创建函数，需要先设置下面这个变量
SET GLOBAL log_bin_trust_function_creators = 1;

-- 使用函数
select customer_name, order_id, order_date, square(total_amount) from customer_orders;

DELIMITER $$
CREATE FUNCTION get_order_total(order_id INT)
RETURNS DECIMAL(10,2)
BEGIN 
	DECLARE total DECIMAL(10,2);
    SELECT sum(quantity * price) INTO total
		FROM order_items
        WHERE order_items.order_id = order_id;
	RETURN total;
END $$
DELIMITER ;

select id, get_order_total(id) from orders;



