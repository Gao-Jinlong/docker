# build stage
# alpine 是一个轻量级的 Linux 发行版，它的体积只有 5MB 左右，比起 Ubuntu 这样的发行版，它的体积要小很多，所以在 Docker 中被广泛使用。
FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

# package.json 单独一层，可以最大程度利用 docker 缓存，避免不必要的 npm install
COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18.0-alpine3.14 as production-stage

# 从第一段构建中拷贝编译产物，不拷贝源码，减少镜像大小
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production

# 安装 pm2 来管理 node 进程
RUN npm install pm2 -g

EXPOSE 3000

# pm2-runtime 会自动监控 node 进程，如果进程挂了，会自动重启
CMD ["pm2-runtime", "/app/main.js"]