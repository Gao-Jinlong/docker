FROM node:latest

WORKDIR /app

COPY . .

RUN npm install -g http-server

EXPOSE 8080

# 声明匿名卷，可以自动生成临时目录挂载到容器中存储数据，防止容器重启或删除时数据丢失
# 不声明时，通过 docker run -v /host/path:/container/path 挂载主机目录到容器中，也可以实现数据持久化，但是如果未指定主机目录，容器重启或删除时数据丢失
VOLUME /app

CMD ["http-server", "-p", "8080"]