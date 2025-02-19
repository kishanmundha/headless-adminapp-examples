import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3';

export const sequelize = new Sequelize({
  dialectModule: sqlite3,
  dialect: 'sqlite',
  storage: ':memory:',
});
