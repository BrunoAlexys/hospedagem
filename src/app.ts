import express from 'express';
import { pool } from './database/pool';
import { errorHandler, notFoundHandler } from './middlewares/error-handler';
import { appointmentRoutes } from './routes/appointment.routes';

export const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'up' });
  } catch {
    res.status(503).json({ status: 'error', database: 'down' });
  }
});

app.use('/appointments', appointmentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
