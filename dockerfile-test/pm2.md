# pm2 管理进程
可以重启 node 进程，记录日志，负载均衡，性能监控

启动程序，内存超过 200M 重启，2s 后每 3s 重启一次 * * * * * * 通配符表示分、时、日、月、周、年
```bash
pm2 start <dir> --max-memory-restart 200M --cron-restart "2/3 * * * * *"
```

文件内容变动自动重启
```bash
pm2 start <dir> [--watch]
```

不自动重启
```bash
pm2 start <dir> --no-autorestart
```

打印日志
```bash
pm2 logs [pid]
```

清空日志
```bash
pm2 flush
```

查看前 100 行日志
```bash
pm2 logs --lines 100
```

负载均衡，使用 node 的 cluster 模块
```bash
pm2 start <dir> -i [number]
```

动态调整进程数
```bash
pm2 scale <app-name> <number>

pm2 scale <app-name> +<number>
```

性能监控
```bash
pm2 monit
```

初始化配置文件
```bash
pm2 ecosystem

# 启动配置
pm2 start ecosystem.config.js
```

常用命令
```bash
pm2 start <dir> # 启动
pm2 stop <dir> # 停止
pm2 restart <dir> # 重启
pm2 delete <dir> # 删除
pm2 [list|ls|status] # 列表
# https://pm2.keymetrics.io/docs/usage/quick-start/
```