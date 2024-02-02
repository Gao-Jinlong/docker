const minio = require('minio');

const minioClient = new minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: '',
  secretKey: '',
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
