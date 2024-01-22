const OSS = require('ali-oss');

const config = {
  region: 'oss-cn-shanghai',
  bucket: '',
  accessKeyId: '',
  accessKeySecret: '',
};
const client = new OSS(config);

async function put() {
  try {
    // const result = await client.put(
    //   `${Math.random().toString(36).substr(2, 15)}.jpg`,
    //   'test.jpg',
    // );

    const date = new Date();

    date.setDate(date.getDate() + 1);

    const res = client.calculatePostSignature({
      expiration: date.toISOString(),
      conditions: [['content-length-range', 0, 1048576000]],
    });

    console.log(res);

    const location = await client.getBucketLocation();

    const host = `http://${config.bucket}.${location.location}.aliyuncs.com`;

    console.log(host);
  } catch (e) {
    console.log(e);
  }
}

put();
