```zsh
# 拉取 redis 镜像
docker pull redis

# 运行容器
docker run --name redis-test -v /Users/gaojinlong/ThisMac/coding/docker/reids:/data -dp 6379:6379 redis

# 启动交互命令行，运行 redis-cli
docker exec -it redis-test redis-cli


# 在 redis 中添加值
set name 'ginlon'
setnx name 'Ginlon' # 仅在 name 不存在时设置 name 为 Ginlon
set age 18
# 递增
incr age
> 19
incrby age 2 # 递增 2 可接受负数 递减
> 21
# 递减
decr age
> 20
decrby age 2

# 查询
get name
> "ginlon"
get age
> 19
# 查看所有存储的键值
keys '*'


# list
# 从左边插入
lpush list 1 2 3 4 5
# 从右边插入
rpush list 6 7 8 9 10
# 查看 list
lrange list 0 -1
# 从左边弹出
lpop list
# 从右边弹出
rpop list
# 查看 list 长度
llen list
# 查看 list 指定位置的值
lindex list 0
# 删除 list 中的值
lrem list 0 1
# 删除 list 中的值，count 为 0 时删除所有值为 value 的元素，count 为正数时从左到右删除 count 个值为 value 的元素，count 为负数时从右到左删除 count 个值为 value 的元素
lrem [key] [count] [value]

# set 无序且不重复
# 添加 set
sadd set 1 1 2 2 2 3 3 4 5
# 查看 set
smembers set
# 判断 set 中是否存在某个值
sismember set 1
# 删除 set 中的值
srem set 1

# sorted set 有序且不重复
# 添加 sorted set，score 为排序依据
zadd [key] [score] [value] ...
zadd sorted-set 1 a 2 b 3 c 4 d 5 e
# 查看 sorted set
zrange sorted-set 0 -1
# 查看 sorted set 中的值的 score
zscore sorted-set a
# 删除 sorted set 中的值
zrem sorted-set a

# hash
# 添加 hash
hset [key] [name] [value] ...
hset hash name 'ginlon' age 18
# 查看 hash
hgetall hash
# 查看 hash 中的值
hget hash name
# 删除 hash 中的值
hdel hash name

# geo 地理位置
# 添加 geo
geoadd [key] [longitude] [latitude] [member] ...
geoadd locate 116.48105 39.996794 'xiaoming' 116.514203 39.905409 'xiaohong' 116.489033 40.007669 'xioali'
# 查看 geo
geopos locate xiaoming
# 计算两个坐标的距离
geodist locate xiaoming xiaohong
# 搜索半径内其它点
georadius locate 15 37 100 KM
# 实际上 geo 在 redis 中会被转换为 sorted set 存储，坐标会被转换为 score

# 设置过期时间
expire [key] [second]
expire someKey 30
# 查看过期时间
ttl [key]
```
官方文档
https://redis.io/commands/