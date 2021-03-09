const container = require('./src/startup/container');
const server = container.resolve('server');

server
  .start()
  .then(async () => {
    console.log('yeah');
  })
  .catch((err) => {
    console.log(err);
    process.exit(0);
  });
