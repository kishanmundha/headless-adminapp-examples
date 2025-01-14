import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3';

export const sequelize = new Sequelize('sqlite::memory:', {
  dialectModule: sqlite3,
});
