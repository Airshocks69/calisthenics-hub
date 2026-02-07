import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get user orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authenticate, (req, res) => {
  res.json({ message: 'Get orders' });
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authenticate, (req, res) => {
  res.status(201).json({ message: 'Create order' });
});

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', authenticate, (req, res) => {
  res.json({ message: 'Get order' });
});

export { router as orderRoutes };
