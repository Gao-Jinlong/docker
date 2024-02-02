const minio = require('minio');

const minioClient = new minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: '5bv9Q2Ve3ybV35PlTCYl',
  secretKey: 'HbtbAGLYYLbvBc2yX1LwsapWRGAUZRDUfT30fXxQ',
});

function put() {
  minioClient.fPutObject(
    'test-bucket',
    'test.jpg',
    './test.jpg',
    function (err, etag) {
      if (err) return console.log(err);
      console.log('File uploaded successfully.');
    },
  );
}
put();
