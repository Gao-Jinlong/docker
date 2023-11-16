const { Etcd3 } = require('etcd3');

const client = new Etcd3({
  hosts: 'http://localhost:2379',
  auth: {
    username: 'root',
    password: 'ginlon',
  },
});

(async () => {
  const services = await client.get('/services/a').string();
  console.log('service A:', services);

  const allServices = await client.getAll().prefix('/services').keys();
  console.log('all services:', allServices);

  const watcher = await client.watch().key('/services/a').create();
  watcher.on('put', (req) => {
    console.log('put', req.value.toString());
  });
  watcher.on('delete', (req) => {
    console.log('delete');
  });
})();

async function saveConfig(key, value) {
  await client.put(key).value(value);
}

async function getConfig(key) {
  return await client.get(key).string();
}

async function deleteConfig(key) {
  await client.delete().key(key);
}

async function registerService(serviceName, instanceId, metadata) {
  const key = `/services/${serviceName}/${instanceId}`;
  const lease = client.lease(10); // 租约10s
  await lease.put(key).value(JSON.stringify(metadata));
  lease.on('lost', async () => {
    console.log('租约过期，重新注册...');
    await registerService(serviceName, instanceId, metadata); // 自动续租，当不再续租时说明服务不可用。
  });
}

async function discoverService(serviceName) {
  const instances = await client
    .getAll()
    .prefix(`/services/${serviceName}`)
    .strings();
  return instances;
}

async function watchService(serviceName, callback) {
  const watcher = await client
    .watch()
    .prefix(`/services/${serviceName}`)
    .create();
  watcher
    .on('put', async (event) => {
      console.log('新的服务节点', event.key.toString());
      callback(await discoverService(serviceName));
    })
    .on('delete', async (event) => {
      console.log('服务节点下线', event.key.toString());
      callback(await discoverService(serviceName));
    });
}

async function main() {
  await saveConfig('config-key', 'config-value');
  const configValue = await getConfig('config-key');
  console.log('config-value:', configValue);

  const serviceName = 'my_service';

  await registerService(serviceName, 'instance_1', {
    host: 'localhost',
    port: 3000,
  });
  await registerService(serviceName, 'instance_2', {
    host: 'localhost',
    port: 3001,
  });

  const instances = await discoverService(serviceName);
  console.log('所有服务节点：', instances);

  // redis 也是 key-value 存储，不用 redis 做配置和注册中心，其中一个原因就是 redis 无法监听不存在的 key 的变化，而 etcd 可以。
  watchService(serviceName, (updatedInstances) => {
    console.log('服务节点更新：', updatedInstances);
  });
}

main();
