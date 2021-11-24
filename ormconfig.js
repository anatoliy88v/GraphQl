const path = require('path');
require('dotenv').config();
const env = 'development';

const options = {
  development: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    type: 'postgres',
    entities: [path.join(__dirname, 'dist/**/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, 'src/migration/*.ts'), path.join(__dirname, 'dist/migrations', '*.js')],
    logger: 'advanced-console',
    logging: true,
    autoLoadEntities: true,
    synchronize: false,
    cli: {
      migrationsDir: 'src/migrations'
    }
  }
}

module.exports = options[env];
