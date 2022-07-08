import express from 'express';
import { todoController } from '../controllers/todo-controller.js';

const router = express.Router();
router.post('/notes/', todoController.addNote);
router.put('/notes/', todoController.updateNote);
router.get('/notes/', (req, res) => {
  todoController.getNotes(req, res);
});

export const todoRoutes = router;