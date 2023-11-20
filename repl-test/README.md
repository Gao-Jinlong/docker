通过以下命令启动

```bash
npm run start:dev -- --entryFile repl
# 即
nest start --watch --entryFile repl
``` 

执行 `debug()` 打印所有 module

`get()` 获取 providers 或者 controllers 可以直接调用

这种方式调用 controller 并不会触发校验

```bash
# 查看所有 module
>  debug()

AppModule:
 - controllers:
  ◻ AppController
 - providers:
  ◻ AppService
UserModule:
 - controllers:
  ◻ UserController
 - providers:
  ◻ UserService

# get() 或 $() 获取 controller 或者 provider，可以直接调用方法
> get(UserModule)
UserModule {}
> get(UserService)
UserService {}
> get(UserService).findAll()
'This action returns all user'
>

# 查看某个 controller 或者 provider
methods()
```
