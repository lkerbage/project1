import { todoStore } from '../services/todo-store.js';

class TodoController {
  constructor(store) {
    this.getNotes = async (req, res) => {
      try {
        res.json(await store.all());
      } catch (err) {
        return err;
      }
    };

    this.addNote = async (req, res, next) => {
      try {
        res.json(await store.add(req.body));
      } catch (err) {
        return next(err);
      }
    };

    this.updateNote = async (req, res, next) => {
      try {
        return res.json(await store.update(req.body));
      } catch (err) {
        return next(err);
      }
    };
  }
}

export const todoController = new TodoController(todoStore);