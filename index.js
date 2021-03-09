const container = require('./src/startup/container');
const server = container.resolve('server');
const db = container.resolve('db');

server
  .start()
  .then(async () => {
    await db.sequelize.sync();
  })
  .catch((err) => {
    console.log(err);
    process.exit(0);
  });
