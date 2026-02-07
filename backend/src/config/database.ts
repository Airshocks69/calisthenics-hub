import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger';

export let sequelize: Sequelize;

export async function initializeDatabase() {
  try {
    sequelize = new Sequelize({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'calisthenics_db',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });

    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');

    // Sync models (development only, use migrations in production)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      logger.info('Database models synced');
    }

    return sequelize;
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    throw error;
  }
}

export async function closeDatabase() {
  if (sequelize) {
    await sequelize.close();
    logger.info('Database connection closed');
  }
}
