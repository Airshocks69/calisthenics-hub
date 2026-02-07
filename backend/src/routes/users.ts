import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Get all users' });
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 */
router.get('/:id', authenticate, (req, res) => {
  res.json({ message: 'Get user by ID' });
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authenticate, (req, res) => {
  res.json({ message: 'Update user' });
});

export { router as userRoutes };
