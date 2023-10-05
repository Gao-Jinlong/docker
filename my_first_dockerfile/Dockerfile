FROM node:latest

WORKDIR /app

COPY . .

RUN npm install -g http-server

EXPOSE 8080

# 声明匿名卷，可以自动生成临时目录挂载到容器中存储数据，防止容器重启或删除时数据丢失
# 不声明时，通过 docker run -v /host/path:/container/path 挂载主机目录到容器中，也可以实现数据持久化，但是如果未指定主机目录，容器重启或删除时数据丢失
VOLUME /app

# 声明环境变量，可以在 docker run 时通过 -e name=value 的方式传入，也可以在 dockerfile 中通过 ENV name=value 的方式声明
# 通过 ARG name=value 的方式声明的变量，只能在 dockerfile 中使用，不能在 docker run 时传入
# 可以在 docker build 时通过 --build-arg name=value 的方式传入，
ARG name
ARG age

# 通过 ${name} 的方式引用环境变量
ENV name=${name} \
    age=${age}


# COPY 会原封不动的拷贝到镜像中，ADD 会自动解压 tar 文件
# > 注意镜像中目录为 /tar_test
# 压缩命令 tar -zcvf xxx.tar.gz xxx
# ADD ./tar_test.tar.gz /tar_test
COPY ./tar_test.tar.gz /tar_test

# 通过 ENTRYPOINT 和 CMD 指令指定容器启动时执行的命令
# ENTRYPOINT 指定的命令不能被 docker run 时指定的命令覆盖，
# CMD 指定的命令可以被 docker run 时指定的命令覆盖
ENTRYPOINT [ "http-server", "-p", "8080"]

# node 运行 test.js
# docker run [container-name] node xxx.js 会覆盖 CMD 指定的命令
CMD ["node", "test.js"]

# 只有 ENTRYPOINT 指定时 docker run 携带的参数会被当做 ENTRYPOINT 指定命令的参数
# docker run [container-name] node xxx.js
# 同时指定 ENTRYPOINT 和 CMD 时，docker run 携带的参数只会覆盖 CMD 指定的参数，不会覆盖 ENTRYPOINT 指定的命令
# 所以可以通过 ENTRYPOINT 作为默认指令
