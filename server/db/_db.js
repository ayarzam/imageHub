const { Sequelize } = require('sequelize');
const pkg = require('../../package.json');
const chalk = require('chalk');

console.log(chalk.yellow('Opening database connection'));

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: (...msg) => console.log(msg),
  }
)
module.exports = db;
