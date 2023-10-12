let mysql = require('mysql2');

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
(async function () {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ginlon',
    database: 'practice',
  });

  const [results, fields] = await connection.query('select * from customers');
  console.log('-------------promise-------------');
  console.log(results);
  console.log(fields.map((item) => item.name));
  console.log('-------------promise end-------------');
})();

// 链接池
mysql = require('mysql2/promise');

(async function () {
  const pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ginlon',
    database: 'practice',
    waitForConnections: true, // 是否等待连接，false 的话，没有连接可用时，立即返回err
    connectionLimit: 10, // 最大连接数
    maxIdle: 10, // 最大空闲连接数
    idleTimeout: 600000, // 空闲连接超时时间，空闲超过这个时间，会被释放
    queueLimit: 0, // 最大等待连接数，超过直接返回错误，0 表示不限制
    enableKeepAlive: true, // 保持心跳
    keepAliveInitialDelay: 0, // 初次连接时，心跳间隔
  });

  const [results] = await pool.query('select * from customers');
  console.log('-------------pool-------------');
  console.log(results);

  // 手动取链接
  const connection = await pool.getConnection();
  const [results2] = await connection.query('select * from customers');
  console.log(results2);
  console.log('-------------pool end-------------');
})();

// ORM 框架 typeorm
// 初始化项目
// npx typeorm@latest init --name typeorm-mysql-test --database mysql
