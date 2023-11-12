const { exec } = require('child_process');

const childProcess = exec('tail -f ./src/log');
childProcess.stdout.on('data', (msg) => {
  console.log(msg);
});
