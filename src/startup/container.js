const { createContainer, asClass, asFunction, asValue } = require('awilix');

//config
const config = require('../config');
const server = require('./');

//repositories
const { UserRepository } = require('../repositories');

//services
const { HomeService, UserService } = require('../services');

//controllers
const { HomeController, UserController } = require('../controllers');

//routes
const { UserRoutes } = require('../routes/index.routes');
const Routes = require('../routes');

//db
const db = require('../models');

const container = createContainer();

container
  .register({
    server: asClass(server).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
    db: asValue(db),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
  })
  .register({
    UserService: asClass(UserService).singleton(),
  })
  .register({
    UserController: asClass(UserController.bind(UserController)).singleton(),
  })
  .register({
    UserRoutes: asFunction(UserRoutes).singleton(),
  });

module.exports = container;
