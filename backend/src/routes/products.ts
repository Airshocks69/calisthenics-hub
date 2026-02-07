import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 */
router.get('/', (req, res) => {
  res.json({ message: 'Get products' });
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authenticate, authorize('admin'), (req, res) => {
  res.status(201).json({ message: 'Create product' });
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 */
router.get('/:id', (req, res) => {
  res.json({ message: 'Get product' });
});

export { router as productRoutes };
