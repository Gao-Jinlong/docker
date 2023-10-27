FROM node:20-slim as init-stage

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# 启用 corepack ，零运行时依赖的 Node.js 脚本，充当 Node.js 和包管理器的桥梁，可以无需安装就使用 yarn, pnpm 和 npm
# corepack 附带在 Node.js 20.0.0 及更高版本中，但是需要手动启用
RUN corepack enable 
WORKDIR /app
COPY package.json /app

FROM init-stage as prod-deps
# 挂载一个临时目录缓存编译和包管理器目录
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod 

FROM init-stage as build-stage

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

COPY . /app

RUN pnpm run build

FROM init-stage as production-stage

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build-stage /app/dist /app

EXPOSE 3000

CMD ["node", "/app/main.js"]