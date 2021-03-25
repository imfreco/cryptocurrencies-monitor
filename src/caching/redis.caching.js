const redis = require('redis');

const config = require('../config');

const RedisClient = redis.createClient(config.REDIS_PORT);

module.exports = RedisClient;
