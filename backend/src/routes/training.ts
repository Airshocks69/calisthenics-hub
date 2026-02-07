import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /api/training/reports:
 *   get:
 *     summary: Get user training reports
 *     tags: [Training]
 *     security:
 *       - bearerAuth: []
 */
router.get('/reports', authenticate, (req, res) => {
  res.json({ message: 'Get training reports' });
});

/**
 * @swagger
 * /api/training/reports:
 *   post:
 *     summary: Create training report
 *     tags: [Training]
 *     security:
 *       - bearerAuth: []
 */
router.post('/reports', authenticate, (req, res) => {
  res.status(201).json({ message: 'Create training report' });
});

export { router as trainingRoutes };
