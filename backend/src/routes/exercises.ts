import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: Get all exercises
 *     tags: [Exercises]
 */
router.get('/', (req, res) => {
  res.json({ message: 'Get exercises' });
});

/**
 * @swagger
 * /api/exercises/{id}:
 *   get:
 *     summary: Get exercise by ID
 *     tags: [Exercises]
 */
router.get('/:id', (req, res) => {
  res.json({ message: 'Get exercise' });
});

export { router as exerciseRoutes };
