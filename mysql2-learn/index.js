const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'ginlon',
  database: 'practice',
});

connection.query('select * from customers', function (err, results, fields) {
  console.log(results);
  console.log(fields.map((item) => item.name));
});

connection.query(
  'select * from customers where name like ?', // 占位符
  ['李%'],
  function (err, results, fields) {
    console.log(results);
    console.log(fields.map((item) => item.name));
  },
);

// 插入数据
connection.execute(
  'insert into customers (name) values(?)',
  ['Ginlon'],
  (err, results, fields) => {
    console.log(err);
  },
);

// 修改
connection.execute(
  'update customers set name="ginlon" where name="Ginlon"',
  (err) => {
    console.log(err);
  },
);

// 删除
connection.execute('delete from customers where name=?', ['ginlon'], (err) => {
  console.log(err);
});

// promise 版本
