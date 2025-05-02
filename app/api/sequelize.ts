import { Sequelize } from 'sequelize';
// import sqlite3 from 'sqlite3';
import pg from 'pg';

// export const sequelize = new Sequelize({
//   dialectModule: sqlite3,
//   dialect: 'sqlite',
//   storage: ':memory:',
// });

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  database: 'postgres',
  dialectModule: pg,
  logging: false,
});
